import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import SceneLights from "./SceneLights";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* =========================================================
   STORY STEPS
   Each step tells the 3D pizza where to turn / zoom.
   Tweak these numbers to change what the camera "focuses" on.
   rotY  = spin around the vertical axis
   tiltX = tilt the pizza toward (+) / away from (-) the camera
   zoom  = camera distance (smaller = closer)
   x, y  = shift the pizza so a certain part sits at the center
========================================================= */

const steps = [
  {
    number: "01",
    title: "THE DOUGH",
    text: "Slow fermented for 48 hours. Stretched by hand, never rolled.",
    rotY: 0.0,
    tiltX: 0.35,
    zoom: 5.2,
    x: 0,
    y: -0.2,
  },
  {
    number: "02",
    title: "THE SAUCE",
    text: "Sun ripened tomatoes, crushed and slow cooked. Nothing else.",
    rotY: 1.6,
    tiltX: 1.1,
    zoom: 4.6,
    x: 0,
    y: -0.4,
  },
  {
    number: "03",
    title: "THE TOPPINGS",
    text: "Fresh mozzarella, basil and everything we love, placed with care.",
    rotY: 3.4,
    tiltX: 0.8,
    zoom: 3.8,
    x: 0.3,
    y: -0.3,
  },
  {
    number: "04",
    title: "THE FIRE",
    text: "90 seconds at 450°C. Blistered crust, melted heart, pure fire.",
    rotY: 5.2,
    tiltX: 0.3,
    zoom: 5.6,
    x: 0,
    y: -0.1,
  },
];

/* =========================================================
   3D SCENE
========================================================= */

function PizzaScene({ stepRef, activeStep }) {
  const { scene } = useGLTF("/models/Pizza.glb");
  const group = useRef();
  const fireLight = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.roughness = Math.max(child.material.roughness ?? 0.6, 0.6);
        child.material.metalness = 0;
      }
    });
  }, [scene]);


  useFrame((state, delta) => {
    const step = steps[stepRef.current];
    const g = group.current;

    if (!g) return;

    const d = THREE.MathUtils;
    const smooth = 2.6; // lower = slower / more cinematic

    g.rotation.y = d.damp(g.rotation.y, step.rotY, smooth, delta);
    g.rotation.x = d.damp(g.rotation.x, step.tiltX, smooth, delta);
    g.position.x = d.damp(g.position.x, step.x, smooth, delta);
    g.position.y = d.damp(g.position.y, step.y, smooth, delta);

    state.camera.position.z = d.damp(
      state.camera.position.z,
      step.zoom,
      smooth,
      delta
    );
    state.camera.lookAt(0, 0, 0);

    // The fire step glows
    if (fireLight.current) {
      const target = stepRef.current === 3 ? 14 : 0;
      fireLight.current.intensity = d.damp(
        fireLight.current.intensity,
        target,
        3,
        delta
      );
    }
  });

  return (
    <>
      <SceneLights fireActive={activeStep === 3} />

      <Environment preset="studio" environmentIntensity={0.25} />

      <group ref={group}>
        <primitive object={scene} scale={2.5} position={[0, -1, 0]} />
      </group>
    </>
  );
}

/* =========================================================
   STORY SECTION
========================================================= */

export default function Story() {
  const sectionRef = useRef(null);
  const stepRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;

      const p = Math.min(1, Math.max(0, -rect.top / scrollable));

      const index = Math.min(steps.length - 1, Math.floor(p * steps.length));

      if (index !== stepRef.current) {
        stepRef.current = index;
        setActiveStep(index);
      }

      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="story" ref={sectionRef}>
      <style>{storyCSS}</style>

      <div className="story-sticky">
        {/* fire glow behind the pizza, only on the last step */}
        <div
          className="story-glow"
          style={{ opacity: activeStep === 3 ? 1 : 0 }}
        />

        <div className="story-top">
          <span>02 / THE CRAFT</span>
          <span>
            {steps[activeStep].number} / {String(steps.length).padStart(2, "0")}
          </span>
        </div>

        <div className="story-canvas">
          <Canvas camera={{ position: [0, 2.5, 5.2], fov: 50 }} gl={{ toneMappingExposure: 0.8 }}>
            <Suspense fallback={null}>
              <PizzaScene stepRef={stepRef} />
            </Suspense>
          </Canvas>
        </div>

        <div className="story-text">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`story-step ${i === activeStep ? "story-step-active" : ""
                } ${i < activeStep ? "story-step-past" : ""}`}
            >
              <span className="story-step-number">{step.number}</span>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        <div className="story-progress">
          <div
            className="story-progress-bar"
            style={{ transform: `scaleY(${progress})` }}
          />
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/models/Pizza.glb");

/* =========================================================
   STYLES (kept inside this file so no other file changes)
========================================================= */

const storyCSS = `
.story {
  position: relative;
  height: 500vh;
  background: #171512;
  color: #f3eee5;
}

.story-sticky {
  position: sticky;
  top: 0;
  height: 100svh;
  overflow: hidden;
}

.story-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 55%,
    rgba(255, 106, 26, 0.28),
    rgba(142, 47, 36, 0.12) 40%,
    transparent 70%
  );
  transition: opacity 1.2s ease;
  pointer-events: none;
}

.story-top {
  position: absolute;
  top: 100px;
  left: 32px;
  right: 32px;
  display: flex;
  justify-content: space-between;
  z-index: 3;
  font-size: 10px;
  letter-spacing: 0.18em;
  opacity: 0.6;
}

.story-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.story-canvas canvas {
  width: 100% !important;
  height: 100% !important;
}

.story-text {
  position: absolute;
  z-index: 2;
  left: 32px;
  top: 50%;
  transform: translateY(-50%);
  width: min(420px, 38vw);
  pointer-events: none;
}

.story-step {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  opacity: 0;
  transform: translateY(calc(-50% + 50px));
  transition:
    opacity 0.7s ease,
    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.story-step-active {
  opacity: 1;
  transform: translateY(-50%);
}

.story-step-past {
  transform: translateY(calc(-50% - 50px));
}

.story-step-number {
  font-size: 11px;
  letter-spacing: 0.18em;
  opacity: 0.55;
}

.story-step h2 {
  margin: 18px 0 22px;
  font-family: "Cafe Francoise", serif;
  font-weight: 400;
  font-size: clamp(56px, 7vw, 120px);
  line-height: 0.82;
  letter-spacing: -0.03em;
}

.story-step p {
  margin: 0;
  max-width: 320px;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(243, 238, 229, 0.7);
}

.story-progress {
  position: absolute;
  z-index: 3;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 160px;
  background: rgba(243, 238, 229, 0.2);
}

.story-progress-bar {
  width: 100%;
  height: 100%;
  background: #f3eee5;
  transform-origin: top;
}

@media (max-width: 700px) {
  .story-top {
    top: 84px;
    left: 20px;
    right: 20px;
  }

  .story-text {
    left: 20px;
    right: 20px;
    top: auto;
    bottom: 40px;
    width: auto;
    height: 220px;
    transform: none;
  }

  .story-step {
    top: auto;
    bottom: 0;
    transform: translateY(50px);
  }

  .story-step-active {
    transform: translateY(0);
  }

  .story-step-past {
    transform: translateY(-50px);
  }

  .story-step h2 {
    font-size: 17vw;
    margin: 12px 0 14px;
  }

  .story-progress {
    right: 20px;
    height: 100px;
  }
}
`;
