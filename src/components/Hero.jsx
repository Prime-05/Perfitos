export default function Hero() {
  const scrollToNext = (event) => {
    const hero = event.currentTarget.closest(".hero");
    hero?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  };

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
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay" />

      <div className="hero-content">

        <p className="hero-location">
          EST. 2026 / MUMBAI
        </p>

        <h1>PERFITOS</h1>

        <div className="hero-bottom">

          <p>
            PIZZA,
            <br />
            REIMAGINED.
          </p>

          <button
            type="button"
            className="hero-scroll"
            onClick={scrollToNext}
          >
            SCROLL TO DISCOVER
            <span aria-hidden="true">↓</span>
          </button>

        </div>

      </div>

    </section>
  );
}