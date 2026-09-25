import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const galleryImages = [
  {
    image: "/images/gallery-01.jpg",
    name: "THE OVEN",
  },
  {
    image: "/images/gallery-02.jpg",
    name: "THE DOUGH",
  },
  {
    image: "/images/gallery-03.jpg",
    name: "THE FIRE",
  },
  {
    image: "/images/gallery-04.jpg",
    name: "THE PIZZA",
  },
  {
    image: "/images/gallery-05.jpg",
    name: "THE TABLE",
  },
  {
    image: "/images/gallery-06.jpg",
    name: "THE PEOPLE",
  },
  {
    image: "/images/gallery-07.jpg",
    name: "THE DETAILS",
  },
  {
    image: "/images/gallery-08.jpg",
    name: "PERFITOS",
  },
];

export default function Gallery() {
  return (
    <>
      <Navbar />

      <main className="gallery-page">

        <section className="gallery-header">

          <span>01 / PERFITOS</span>

          <h1>
            GALLERY
          </h1>

          <p>
            A glimpse into the dough,
            <br />
            fire and everything in between.
          </p>

        </section>

        <section className="gallery-grid-page">

          {galleryImages.map((item, index) => (

            <div
              className={`gallery-item gallery-item-${index + 1}`}
              key={item.name}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="gallery-label">
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>
                  {item.name}
                </strong>
              </div>

            </div>

          ))}

        </section>

        <div className="gallery-next">

          <Link to="/menu">
            EXPLORE THE MENU
            <span>↗</span>
          </Link>

        </div>

      </main>
    </>
  );
}