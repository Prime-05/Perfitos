import { useEffect, useRef, useState } from "react";

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [enabled, setEnabled] = useState(() => !isTouchDevice());
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const handlePointer = (e) => {
      // Switch on/off depending on the active input type
      setEnabled(e.pointerType === "mouse");
    };

    window.addEventListener("pointerdown", handlePointer);
    window.addEventListener("pointermove", handlePointer);

    return () => {
      window.removeEventListener("pointerdown", handlePointer);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    const moveCursor = (e) => {
      if (!cursorRef.current) return;

      // translate to pointer, then -50% to center the dot on it
      cursorRef.current.style.transform =
        `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [enabled, reducedMotion]);

  if (!enabled || reducedMotion) return null;

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}