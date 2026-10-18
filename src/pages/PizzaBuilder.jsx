
import { useState } from "react";
import PizzaViewer from "../components/PizzaViewer";

const steps = [
    { number: "01", title: "Dough" },
    { number: "02", title: "Sauce" },
    { number: "03", title: "Toppings" },
    { number: "04", title: "Addons" },
];

const doughOptions = [
    { id: "classic", name: "Classic", description: "Hand-stretched and balanced" },
    { id: "thin", name: "Thin crust", description: "Light, crisp and delicate" },
    { id: "thick", name: "Thick crust", description: "Soft, fluffy and generous" },
];

const sauceOptions = [
    { id: "tomato", name: "Classic tomato", description: "Rich Italian tomato flavour" },
    { id: "spicy", name: "Spicy tomato", description: "A little heat and herbs" },
    { id: "pesto", name: "Herb pesto", description: "Fresh and aromatic" },
];

const toppingOptions = [
    { id: "pepper", name: "Bell pepper", description: "Fresh and colourful" },
    { id: "mushroom", name: "Mushroom", description: "Earthy and savoury" },
    { id: "tomato", name: "Tomato", description: "Juicy and fresh" },
];

const cheeseOptions = [
    { id: "mozzarella", name: "Extra mozzarella", description: "Creamy and stretchy" },
    { id: "parmesan", name: "Parmesan", description: "A savoury finish" },
];

function OptionCard({ option, selected, onClick, multiple = false }) {
    return (
        <button
            type="button"
            className={`builder-option ${selected ? "is-selected" : ""}`}
            onClick={onClick}
            aria-pressed={selected}
        >
            <span className="option-marker">
                {selected ? "✓" : multiple ? "+" : "○"}
            </span>

            <span className="option-copy">
                <span className="option-name">{option.name}</span>
                <span className="option-description">{option.description}</span>
            </span>

            <span className="option-indicator">
                {selected ? "SELECTED" : multiple ? "ADD" : "SELECT"}
            </span>
        </button>
    );
}

export default function PizzaBuilder() {
    const [activeStep, setActiveStep] = useState(0);
    const [dough, setDough] = useState("classic");
    const [sauce, setSauce] = useState("tomato");
    const [toppings, setToppings] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [review, setReview] = useState(false);

    function toggleItem(setter, current, id) {
        setter(
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    }

    function nextStep() {
        if (activeStep < steps.length - 1) {
            setActiveStep((step) => step + 1);
        } else {
            setReview(true);
        }
    }

    function backStep() {
        if (review) {
            setReview(false);
            return;
        }

        setActiveStep((step) => Math.max(0, step - 1));
    }

    function resetBuilder() {
        setActiveStep(0);
        setDough("classic");
        setSauce("tomato");
        setToppings([]);
        setCheeses([]);
        setReview(false);
    }

    const selectedDough = doughOptions.find((item) => item.id === dough);
    const selectedSauce = sauceOptions.find((item) => item.id === sauce);

    return (
        <main className="pizza-builder-page">
            <header className="builder-header">
                <a href="/" className="builder-logo">
                    PERFITOS<span>.</span>
                </a>

                <span className="builder-header-center">THE PIZZA LAB</span>

                <a href="/menu" className="builder-exit">
                    EXIT ↗
                </a>
            </header>

            <section className="builder-intro">
                <p className="builder-eyebrow">YOUR KITCHEN. YOUR RULES.</p>
                <h1>
                    Make it <em>yours.</em>
                </h1>
                <p className="builder-subtitle">
                    Start with the basics. Add what you love.
                    Create a pizza that is unmistakably yours.
                </p>
            </section>

            <nav className="builder-progress" aria-label="Pizza-making steps">
                {steps.map((step, index) => (
                    <button
                        key={step.number}
                        type="button"
                        className={[
                            "progress-step",
                            activeStep === index && !review ? "is-active" : "",
                            index < activeStep || review ? "is-complete" : "",
                        ].join(" ")}
                        onClick={() => {
                            setActiveStep(index);
                            setReview(false);
                        }}
                    >
                        <span className="progress-number">
                            {index < activeStep || review ? "✓" : step.number}
                        </span>
                        <span className="progress-title">{step.title}</span>
                    </button>
                ))}
            </nav>

            <section className="builder-workspace">
                <div className="builder-preview">
                    <div className="preview-topline">
                        <span>YOUR CREATION</span>
                        <span>01 — 04</span>
                    </div>

                    <div className="preview-stage">
                        <PizzaViewer
                            item={{ name: "YOUR PIZZA" }}
                            toppings={toppings}
                            builderMode
                            modelPath="/models/Pizza_unmeshed.glb"
                            showBaseCheese={cheeses.length > 0}
                        />
                        <div className="preview-caption">
                            <span className="preview-caption-dot" />
                            INTERACTIVE 3D PREVIEW
                        </div>
                    </div>

                    <div className="preview-bottomline">
                        <span>MADE BY YOU</span>
                        <span>MADE WITH LOVE.</span>
                    </div>
                </div>

                <div className="builder-controls">
                    {!review ? (
                        <>
                            <div className="controls-heading">
                                <p className="builder-eyebrow">
                                    STEP {steps[activeStep].number}
                                </p>

                                <h2>
                                    {activeStep === 0 && <>Choose your <em>dough.</em></>}
                                    {activeStep === 1 && <>Set the <em>foundation.</em></>}
                                    {activeStep === 2 && <>Make it <em>yours.</em></>}
                                    {activeStep === 3 && <>Finish your <em>creation.</em></>}
                                </h2>

                                <p>
                                    {activeStep === 0 && "Every great pizza starts with a great base."}
                                    {activeStep === 1 && "Choose the flavour that brings it all together."}
                                    {activeStep === 2 && "Pick your favourites. Add as many as you like."}
                                    {activeStep === 3 && " Add extra cheese or another finishing touch."}
                                </p>
                            </div>

                            <div className="builder-options">
                                {activeStep === 0 &&
                                    doughOptions.map((option) => (
                                        <OptionCard
                                            key={option.id}
                                            option={option}
                                            selected={dough === option.id}
                                            onClick={() => setDough(option.id)}
                                        />
                                    ))}

                                {activeStep === 1 &&
                                    sauceOptions.map((option) => (
                                        <OptionCard
                                            key={option.id}
                                            option={option}
                                            selected={sauce === option.id}
                                            onClick={() => setSauce(option.id)}
                                        />
                                    ))}

                                {activeStep === 2 &&
                                    toppingOptions.map((option) => (
                                        <OptionCard
                                            key={option.id}
                                            option={option}
                                            selected={toppings.includes(option.id)}
                                            multiple
                                            onClick={() =>
                                                toggleItem(setToppings, toppings, option.id)
                                            }
                                        />
                                    ))}

                                {activeStep === 3 && (
                                    <>
                                        {cheeseOptions.map((option) => (
                                            <OptionCard
                                                key={option.id}
                                                option={option}
                                                selected={cheeses.includes(option.id)}
                                                multiple
                                                onClick={() =>
                                                    toggleItem(setCheeses, cheeses, option.id)
                                                }
                                            />
                                        ))}

                                        <button
                                            type="button"
                                            className={`skip-cheese ${cheeses.length === 0 ? "is-selected" : ""
                                                }`}
                                            onClick={() => setCheeses([])}
                                        >
                                            No extra cheese
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="builder-navigation">
                                <button
                                    type="button"
                                    className="builder-back"
                                    disabled={activeStep === 0}
                                    onClick={backStep}
                                >
                                    ← BACK
                                </button>

                                <button
                                    type="button"
                                    className="builder-continue"
                                    onClick={nextStep}
                                >
                                    {activeStep === 3 ? "REVIEW YOUR PIZZA" : "CONTINUE"}
                                    <span>↗</span>
                                </button>
                            </div>

                            <p className="builder-helper">
                                STEP {String(activeStep + 1).padStart(2, "0")} OF 04
                            </p>
                        </>
                    ) : (
                        <div className="builder-review">
                            <p className="builder-eyebrow">THE FINAL CREATION</p>
                            <h2>Looking <em>delicious.</em></h2>
                            <p className="review-description">
                                Here's what you've selected for your pizza.
                            </p>

                            <div className="review-list">
                                <div>
                                    <span>Dough</span>
                                    <strong>{selectedDough?.name}</strong>
                                </div>
                                <div>
                                    <span>Sauce</span>
                                    <strong>{selectedSauce?.name}</strong>
                                </div>
                                <div>
                                    <span>Toppings</span>
                                    <strong>
                                        {toppings.length
                                            ? toppingOptions
                                                .filter((item) => toppings.includes(item.id))
                                                .map((item) => item.name)
                                                .join(", ")
                                            : "None selected"}
                                    </strong>
                                </div>
                                <div>
                                    <span>Extra cheese</span>
                                    <strong>
                                        {cheeses.length
                                            ? cheeseOptions
                                                .filter((item) => cheeses.includes(item.id))
                                                .map((item) => item.name)
                                                .join(", ")
                                            : "None"}
                                    </strong>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="builder-continue review-edit"
                                onClick={resetBuilder}
                            >
                                CREATE ANOTHER PIZZA <span>↗</span>
                            </button>

                            <p className="builder-helper">
                                PREVIEW ONLY — SUBMISSION NOT CONNECTED
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <footer className="builder-footer">
                <span>PERFITOS PIZZA LAB</span>
                <span>GOOD THINGS TAKE DOUGH.</span>
            </footer>
        </main>
    );
}
