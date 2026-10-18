import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Menu from "./pages/Menu";
import PizzaBuilder from "./pages/PizzaBuilder";
import { TransitionProvider } from "./components/PageTransition";

import "./App.css";

function App() {
  return (
    <>
      <CustomCursor />

      <BrowserRouter>
        <TransitionProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/pizza-builder" element={<PizzaBuilder />} />
          </Routes>
        </TransitionProvider>
      </BrowserRouter>
    </>
  );
}

export default App;