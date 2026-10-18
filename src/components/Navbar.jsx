import { useEffect, useRef, useState } from "react";
import { TransitionLink } from "./PageTransition";
import { Link, useLocation } from "react-router-dom";

/* Logo colours for each kind of background */
const LOGO_ON_LIGHT = "#8a0303"; // blood red on cream
const LOGO_ON_DARK = "#d63a2f";  // brighter red on dark / video
const LOGO_ON_RED = "#f3eee5";   // cream on red sections

/* Menu link colours for each kind of background */
const LINKS_ON_LIGHT = "#171512"; // near-black on cream
const LINKS_ON_DARK = "#f3eee5";  // cream on dark / video
const LINKS_ON_RED = "#f3eee5";   // cream on red sections

function getBackgroundBehind(x, y) {
  const elements = document.elementsFromPoint(x, y);

  for (const el of elements) {
    if (el.closest(".navbar, .page-curtain, .custom-cursor")) continue;

    let node = el;
    while (node && node !== document.documentElement) {
      const bg = getComputedStyle(node).backgroundColor;
      const parts = bg.match(/[\d.]+/g);

      if (parts && (parts.length < 4 || parseFloat(parts[3]) > 0.5)) {
        return parts.slice(0, 3).map(Number);
      }
      node = node.parentElement;
    }
  }

  return [23, 21, 18];
}

function classifyBackground([r, g, b]) {
  const isRed = r > g + 40 && r > b + 40;
  if (isRed) return "red";

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "light" : "dark";
}

const LOGO_COLORS = {
  light: LOGO_ON_LIGHT,
  dark: LOGO_ON_DARK,
  red: LOGO_ON_RED,
};

const LINK_COLORS = {
  light: LINKS_ON_LIGHT,
  dark: LINKS_ON_DARK,
  red: LINKS_ON_RED,
};

function sampleCenter(element) {
  const rect = element.getBoundingClientRect();
  return classifyBackground(
    getBackgroundBehind(rect.left + rect.width / 2, rect.top + rect.height / 2)
  );
}

export default function Navbar({ dark = false }) {
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const [logoColor, setLogoColor] = useState(LOGO_ON_LIGHT);
  const [linkColor, setLinkColor] = useState(LINKS_ON_DARK);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;

      if (logoRef.current) {
        setLogoColor(LOGO_COLORS[sampleCenter(logoRef.current)]);
      }

      if (linksRef.current) {
        setLinkColor(LINK_COLORS[sampleCenter(linksRef.current)]);
      }
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <header className={`navbar${dark ? " navbar--dark" : ""}`}>

      {isHome ? (
        <Link
          to="/"
          className="nav-logo"
          ref={logoRef}
          style={{ color: logoColor }}
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Perfitos
        </Link>
      ) : (
        <TransitionLink
          to="/"
          className="nav-logo"
          ref={logoRef}
          style={{ color: logoColor }}
        >
          Perfitos
        </TransitionLink>
      )}

      <nav
        className="nav-links"
        ref={linksRef}
        style={{ color: linkColor }}
      >

        <TransitionLink to="/gallery">
          GALLERY
        </TransitionLink>

        <TransitionLink to="/menu">
          MENU
        </TransitionLink>

        <TransitionLink to="/pizza-builder">
          PIZZA BUILDER
        </TransitionLink>

      </nav>

    </header>
  );
}