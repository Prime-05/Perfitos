import { TransitionLink } from "../components/PageTransition";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <section className="home-explore">

          <div className="home-explore-heading">
            <span>01</span>

            <h2>
              DISCOVER
              <br />
              PERFITOS
            </h2>
          </div>


          <div className="home-explore-grid">

            <TransitionLink
              to="/gallery"
              className="home-explore-card"
              viewTransition
            >
              <img
                src="/images/gallery.png"
                alt="Perfitos Gallery"
              />

              <div className="home-card-overlay">
                <div>GALLERY</div>
                <span>
                  SEE THE WORLD OF PERFITOS ↗
                </span>
              </div>
            </TransitionLink>


            <TransitionLink
              to="/menu"
              className="home-explore-card"
              viewTransition
            >
              <img
                src="/images/menu.png"
                alt="Perfitos Menu"
              />

              <div className="home-card-overlay">
                <div>MENU</div>
                <span>
                  EXPLORE OUR PIZZAS ↗
                </span>
              </div>
            </TransitionLink>

          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}