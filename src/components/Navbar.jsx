import { TransitionLink } from "./PageTransition";
import { Link } from "react-router-dom";

export default function Navbar({ dark = false }) {
  return (
    <header className={`navbar${dark ? " navbar--dark" : ""}`}>

      <Link
        to="/"
        className="nav-logo"
      >
        PERFITOS
      </Link>

      <nav className="nav-links">

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