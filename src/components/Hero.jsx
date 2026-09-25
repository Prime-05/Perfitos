import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">

      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source
          src="/video/hero.mp4"
          type="video/mp4"
        />
      </video>

      <div className="hero-overlay" />

      <div className="hero-content">

        <p className="hero-location">
          EST. 2026 / MUMBAI
        </p>

        <h1>
          PERFITOS
        </h1>

        <div className="hero-bottom">

          <p>
            PIZZA,
            <br />
            REIMAGINED.
          </p>

          <div className="hero-actions">

            <Link to="/gallery">
              GALLERY
              <span>↓</span>
            </Link>

            <Link to="/menu">
              MENU
              <span>↗</span>
            </Link>

          </div>

          <p className="hero-scroll">
            SCROLL TO DISCOVER
          </p>

        </div>

      </div>

    </section>
  );
}