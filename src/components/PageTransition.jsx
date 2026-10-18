import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const [transitioning, setTransitioning] = useState(false);
  const [revealing, setRevealing] = useState(false);

  const transitionTo = (path) => {
    if (transitioning) return;

    setTransitioning(true);

    // Curtain comes down
    setTimeout(() => {
      navigate(path);

      // Give React time to render the new page
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        setRevealing(true);

        // Curtain has finished leaving
        setTimeout(() => {
          setTransitioning(false);
          setRevealing(false);
        }, 700);
      }, 80);
    }, 650);
  };

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}

      <div
        className={`page-curtain ${
          transitioning ? "page-curtain-active" : ""
        } ${
          revealing ? "page-curtain-reveal" : ""
        }`}
      />
    </TransitionContext.Provider>
  );
}

export function TransitionLink({
  to,
  children,
  className = "",
  ...props
}) {
  const { transitionTo } = useContext(TransitionContext);

  return (
    <a
      href={to}
      className={className}
      {...props}
      onClick={(event) => {
        event.preventDefault();
        transitionTo(to);
      }}
    >
      {children}
    </a>
  );
}