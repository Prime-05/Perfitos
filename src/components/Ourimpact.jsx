import { useEffect, useRef, useState } from "react";
import "./Ourimpact.css";
import "./Ourimpact.scenes.css";

/* How tall the pizza stack looks compared with the Burj Khalifa (0-100).
   Once you know the real number: (stack height in m / 828) * 100 */
const STACK_HEIGHT_PERCENT = 72;
const PIZZA_COUNT = 24;

// Replace these placeholder values with verified Perfitos totals before publishing.
const IMPACT_STORIES = [
  {
    id: "dough",
    number: "01",
    eyebrow: "THE FOUNDATION",
    title: "A whole lot of dough.",
    description:
      "Every great pizza starts here. Add the total amount of dough Perfitos has prepared, then compare its weight with an elephant.",
    amount: "ADD TOTAL",
    unit: "kg of dough used",
    comparison: "≈ ADD ELEPHANT COUNT elephants",
    visual: "elephant",
    note: "Use a stated reference weight for an adult elephant once the total is confirmed.",
  },
  {
    id: "sauce",
    number: "02",
    eyebrow: "THE BASE LAYER",
    title: "Sauce makes the story.",
    description:
      "A little tang, a little sweetness, and a lot of flavour. Add the total sauce used and compare it with a familiar container.",
    amount: "ADD TOTAL",
    unit: "litres of sauce used",
    comparison: "That’s about ADD CONTAINER COUNT large bottles.",
    visual: "sauce",
    note: "Choose a bottle or container size that fits the actual quantity.",
  },
  {
    id: "toppings",
    number: "03",
    eyebrow: "THE FINISHING TOUCH",
    title: "Good things go on top.",
    description:
      "Pepper, mushrooms, cheese and all the extras that make each slice its own. Add verified totals for the toppings you want to feature.",
    amount: "ADD TOTAL",
    unit: "kg of toppings used",
    comparison: "Pepper · mushrooms · cheese · and more",
    visual: "toppings",
    note: "Use individual ingredient totals if records are available.",
  },
  {
    id: "pizzas",
    number: "04",
    eyebrow: "THE BIG NUMBER",
    title: "Slices that stack up.",
    description:
      "Every pizza is part of the Perfitos story. Add the total pizzas sold and compare a theoretical pizza stack with the Burj Khalifa.",
    amount: "ADD TOTAL",
    unit: "pizzas sold",
    comparison: "A stack could reach ADD HEIGHT metres.",
    visual: "burj",
    note: "Calculate stack height from verified sales and a stated average pizza thickness.",
  },
];

/* ---------- DOUGH: a pile of dough balls ---------- */

// Bottom row first, so upper balls are drawn on top.
const DOUGH_BALLS = [
  { x: 55, y: 178 },
  { x: 120, y: 182 },
  { x: 185, y: 178 },
  { x: 245, y: 182 },
  { x: 88, y: 140 },
  { x: 153, y: 144 },
  { x: 218, y: 140 },
  { x: 120, y: 102 },
  { x: 186, y: 104 },
  { x: 152, y: 64 },
];

function DoughPile() {
  return (
    <svg
      className="impact-dough-pile"
      viewBox="0 0 300 220"
      role="img"
      aria-label="Illustration of a pile of pizza dough balls"
    >
      <ellipse cx="150" cy="211" rx="138" ry="9" fill="#171512" opacity=".12" />
      {DOUGH_BALLS.map((ball, i) => (
        <g
          key={i}
          className="impact-dough-ball"
          style={{ "--i": i }}
        >
          <ellipse
            cx={ball.x}
            cy={ball.y}
            rx="36"
            ry="30"
            fill="#e3bd80"
            stroke="#9d6336"
            strokeWidth="3"
          />
          <path
            d={`M${ball.x - 22} ${ball.y - 6} Q${ball.x - 10} ${ball.y - 21} ${ball.x + 8} ${ball.y - 19}`}
            fill="none"
            stroke="#f6e3bd"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d={`M${ball.x - 14} ${ball.y + 14} Q${ball.x + 4} ${ball.y + 21} ${ball.x + 22} ${ball.y + 10}`}
            fill="none"
            stroke="#c99a5c"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}

function SauceIllustration() {
  return (
    <svg className="impact-svg" viewBox="0 0 620 390" role="img" aria-label="Illustration of sauce bottles">
      <ellipse cx="310" cy="340" rx="180" ry="13" fill="currentColor" opacity=".08" />
      {[0, 1, 2, 3, 4].map((item) => {
        const x = 174 + item * 57;
        const y = item % 2 === 0 ? 105 : 130;
        return (
          <g key={item} transform={`translate(${x} ${y})`} className="impact-bottle">
            <path d="M20 0 H38 V20 L47 35 V145 Q47 158 35 158 H12 Q0 158 0 145 V35 L9 20 V0 H20Z" fill="#e8d8bc" stroke="#171512" strokeWidth="3" />
            <path d="M4 73 H43 V143 Q43 153 34 153 H13 Q4 153 4 143Z" fill="#8e2f24" />
            <rect x="12" y="-12" width="23" height="14" rx="2" fill="#171512" />
            <rect x="7" y="88" width="33" height="31" fill="#f3eee5" />
            <path d="M13 99 H34 M13 106 H31" stroke="#8e2f24" strokeWidth="2" />
          </g>
        );
      })}
      <text x="310" y="355" textAnchor="middle" fill="currentColor" opacity=".55" fontSize="11" letterSpacing="3">FLAVOUR IN EVERY LAYER</text>
    </svg>
  );
}

function SceneVisual({ type }) {
  return (
    <div className={`impact-visual-art impact-art-${type}`} key={type}>
      {type === "elephant" && (
        <div className="impact-scene impact-scene-dough">
          <figure className="impact-figure impact-figure-dough">
            <DoughPile />
            <figcaption>THE DOUGH</figcaption>
          </figure>

          <figure className="impact-figure impact-figure-elephant">
            <img
              className="impact-elephant"
              src="/images/impact/elephant.png"
              alt="Elephant illustrating the weight of dough used"
            />
            <figcaption>THE ELEPHANT</figcaption>
          </figure>
        </div>
      )}

      {type === "sauce" && <SauceIllustration />}

      {type === "toppings" && (
        <div className="impact-ingredient-photos">
          <img src="/images/impact/mushroom.png" alt="Mushrooms" />
          <img src="/images/impact/cheese.png" alt="Cheese" />
          <img src="/images/impact/pepper.png" alt="Pepper" />
        </div>
      )}

      {type === "burj" && (
        <div
          className="impact-scene impact-scene-burj"
          style={{ "--stack-height": `${STACK_HEIGHT_PERCENT}%` }}
        >
          {/* left: pizza stack rising from the bottom */}
          <div className="impact-stack-col">
            <div
              className="impact-stack"
              role="img"
              aria-label="Illustration of pizzas stacked from the bottom up"
            >
              {Array.from({ length: PIZZA_COUNT }, (_, i) => (
                <span
                  key={i}
                  className="impact-pizza"
                  style={{ "--i": i }}
                >
                  <span />
                </span>
              ))}
            </div>
          </div>

          {/* dashed line showing where the stack ends */}
          <div className="impact-height-line" aria-hidden="true">
            <span>THE PIZZA STACK</span>
          </div>

          {/* right: Burj Khalifa, fitted edge to edge */}
          <img
            className="impact-burj"
            src="/images/impact/burj khalifa.png"
            alt="Burj Khalifa used for the pizza-stack height comparison"
          />
        </div>
      )}
    </div>
  );
}

export default function OurImpact() {
  const chapterRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const frameRef = useRef(null);          // ← add
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.impactIndex);
          if (Number.isInteger(index)) setActiveIndex(index);
        });
      },
      { root: null, rootMargin: "-38% 0px -38% 0px", threshold: 0 }
    );

    chapterRefs.current.forEach((chapter) => chapter && observer.observe(chapter));
    return () => observer.disconnect();
  }, []);
   
    useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || !frameRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );

    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);

  const activeStory = IMPACT_STORIES[activeIndex];

  return (
    <section className="our-impact" aria-labelledby="our-impact-title">
      <div className="impact-opening">
        <span className="impact-kicker">PERFITOS · OUR STORY IN NUMBERS</span>
        <h2 id="our-impact-title">WHAT WE’VE<br /><em>PUT INTO</em> PERFITOS.</h2>
        <p>Ingredients measured. Pizzas shared. A whole lot of love, counted one slice at a time.</p>
        <span className="impact-scroll-cue">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>
      </div>

      <div className="impact-story-layout">
        <div className="impact-chapters" aria-label="Perfitos impact stories">
          {IMPACT_STORIES.map((story, index) => (
            <article
              className={`impact-chapter ${activeIndex === index ? "is-active" : ""}`}
              key={story.id}
              data-impact-index={index}
              ref={(element) => { chapterRefs.current[index] = element; }}
              aria-current={activeIndex === index ? "step" : undefined}
            >
              <div className="impact-chapter-meta"><span>{story.number}</span><span>{story.eyebrow}</span></div>
              <h3>{story.title}</h3>
              <p className="impact-description">{story.description}</p>
              <div className="impact-stat"><strong>{story.amount}</strong><span>{story.unit}</span></div>
              <p className="impact-comparison">{story.comparison}</p>
              <p className="impact-note">{story.note}</p>
            </article>
          ))}
        </div>

             <div
               className="impact-visual-sticky"
                ref={frameRef}
               aria-label={`Illustration: ${activeStory.title}`}
>
                {inView && <SceneVisual type={activeStory.visual} />}
              <div className="impact-progress" aria-hidden="true">
            <span style={{ width: `${((activeIndex + 1) / IMPACT_STORIES.length) * 100}%` }} />
          </div>
        </div>
      </div>

    
    </section>
  );
}