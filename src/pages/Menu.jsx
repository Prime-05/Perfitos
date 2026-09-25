import { useState } from "react";

import Navbar from "../components/Navbar";
import PizzaViewer from "../components/PizzaViewer";

const categories = {
  PIZZAS: [
    {
      name: "MARGHERITA",
      description: "Tomato · Mozzarella · Basil",
      price: 399,
    },
    {
      name: "PERFITOS SPECIAL",
      description: "Our signature pizza",
      price: 599,
    },
    {
      name: "PEPPERONI",
      description: "Tomato · Mozzarella · Pepperoni",
      price: 499,
    },
  ],

   VEG: [
    {
      name: "MARGHERITA",
      description: "Tomato · Mozzarella · Basil",
      price: 399,
    },
    {
      name: "FARMHOUSE",
      description: "Onion · Capsicum · Mushroom · Mozzarella",
      price: 449,
    },
    {
      name: "PESTO GARDEN",
      description: "Pesto · Mozzarella · Cherry Tomato · Basil",
      price: 479,
    },
    {
      name: "FOUR CHEESE",
      description: "Mozzarella · Parmesan · Cheddar · Gorgonzola",
      price: 499,
    },
    {
      name: "PERFITOS SPECIAL",
      description: "Our signature vegetarian pizza",
      price: 549,
    },
  ],

  "NON-VEG": [
    {
      name: "CHICKEN FIRE",
      description: "Chicken · Mozzarella · Chilli",
      price: 549,
    },
    {
      name: "SPICY PEPPERONI",
      description: "Pepperoni · Mozzarella · Chilli",
      price: 549,
    },
  ],

  SIDES: [
    {
      name: "GARLIC BREAD",
      description: "Garlic · Butter · Herbs",
      price: 199,
    },
    {
      name: "CHEESE BITES",
      description: "Crispy · Cheesy · Delicious",
      price: 249,
    },
  ],
};

export default function Menu() {

  const [category, setCategory] = useState("PIZZAS");

  const [selectedItem, setSelectedItem] = useState(
    categories.PIZZAS[0]
  );

  const selectCategory = (name) => {

    setCategory(name);

    setSelectedItem(categories[name][0]);

  };

  return (
    <>
      <Navbar />

      <main className="menu-page">

        <section className="menu-page-header">

          <span>02 / PERFITOS</span>

          <h1>
            MENU
          </h1>

          <p>
            Choose your craving.
          </p>

        </section>

        <section className="menu-interface">

          <aside className="menu-categories">

            {Object.keys(categories).map((name) => (

              <button
                key={name}
                className={
                  category === name
                    ? "category-active"
                    : ""
                }
                onClick={() => selectCategory(name)}
              >
                {name}
              </button>

            ))}

          </aside>

          <div className="menu-items">

            {categories[category].map((item) => (

              <button
                key={item.name}
                className={
                  selectedItem.name === item.name
                    ? "menu-item selected"
                    : "menu-item"
                }
                onClick={() => setSelectedItem(item)}
              >

                <span>
                  {item.name}
                </span>

                <small>
                  {item.description}
                </small>

                <strong>
                  ₹{item.price}
                </strong>

              </button>

            ))}

          </div>

        </section>

        <section className="pizza-experience">

          <div className="pizza-title">

            <span>
              YOUR SELECTION
            </span>

            <h2>
              {selectedItem.name}
            </h2>

            <p>
              {selectedItem.description}
            </p>

            <strong>
              ₹{selectedItem.price}
            </strong>

          </div>

            <PizzaViewer item={selectedItem} />

        </section>

      </main>
    </>
  );
}