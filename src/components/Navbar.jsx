import { TransitionLink } from "./PageTransition";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">

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

      </nav>

    </header>
  );
}