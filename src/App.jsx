import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Menu from "./pages/Menu";

import { TransitionProvider } from "./components/PageTransition";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </TransitionProvider>
    </BrowserRouter>
  );
}

export default App;