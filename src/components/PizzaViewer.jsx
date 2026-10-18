
import { useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  useGLTF,
} from "@react-three/drei";

const TOPPING_MODEL_PATHS = {
  pepper: "/models/pepper.glb",
  mushroom: "/models/mushroom.glb",
  tomato: "/models/tomato.glb",
};

function PizzaModel({ modelPath, activeStep, builderMode }) {
  const { scene } = useGLTF(modelPath);

  const clonedScene = useMemo(
    () => scene.clone(true),
    [scene]
  );

  useEffect(() => {
    clonedScene.traverse((object) => {
      if (!object.isMesh) return;

      const name = object.name.toLowerCase();

      if (!builderMode) return;

      // Original ingredients from the unmeshed pizza
      const isOriginalTopping =
        name.includes("salami") ||
        name.includes("tomatoes") ||
        name.includes("leaves") ||
        name.includes("basil");

      const isCheese = name.includes("cheese");

      // Dough stage: hide original toppings and cheese.
      // Toppings stage: reveal original toppings.
      // Add-ons stage: reveal the original cheese mesh.
      if (isOriginalTopping) {
        object.visible = activeStep >= 2;
      }

      if (isCheese) {
        object.visible = activeStep >= 3;
      }
    });
  }, [clonedScene, activeStep, builderMode]);

  return (
    <primitive
      object={clonedScene}
      scale={2.5}
      position={[0, -1, 0]}
    />
  );
}

function ToppingModel({ id }) {
  const path = TOPPING_MODEL_PATHS[id];

  const { scene } = useGLTF(path);

  const cloned = useMemo(
    () => scene.clone(true),
    [scene]
  );

  return <primitive object={cloned} />;
}

function IngredientLabel({ position, title, description }) {
  return (
    <Html position={position} center>
      <div className="ingredient-label">
        <div className="ingredient-line" />
        <div className="ingredient-text">
          <strong>{title}</strong>
          <span>{description}</span>
        </div>
      </div>
    </Html>
  );
}

export default function PizzaViewer({
  item = { name: "Pizza" },
  toppings = [],
  builderMode = false,
  modelPath = "/models/Pizza.glb",
  activeStep = 0,
  showBaseCheese = false,
}) {
  return (
    <div className="pizza-viewer">
      {item?.name && !builderMode && (
        <div className="pizza-model-name">
          {item.name}
        </div>
      )}

      <Canvas
        camera={{
          position: [0, 2.5, 6],
          fov: 40,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />

        <directionalLight
          position={[4, 6, 4]}
          intensity={1.1}
        />

        <Environment
          preset="studio"
          environmentIntensity={0.25}
        />

        <PizzaModel
          modelPath={modelPath}
          builderMode={builderMode}
          activeStep={activeStep}
          showBaseCheese={showBaseCheese}
        />

        <group scale={2.5} position={[0, -0.9, 0]}>
          {toppings.map((id) => (
            <ToppingModel key={id} id={id} />
          ))}
        </group>

        {!builderMode && (
          <>
            <IngredientLabel
              position={[1.3, 0.8, 0]}
              title="MOZZARELLA"
              description="Fresh & creamy"
            />

            <IngredientLabel
              position={[-1.4, 0.2, 0]}
              title="TOMATO"
              description="Slow cooked sauce"
            />

            <IngredientLabel
              position={[0, -0.6, 0]}
              title="BASIL"
              description="Fresh basil"
            />
          </>
        )}

        <OrbitControls
          enableZoom
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.7}
          minDistance={3}
          maxDistance={9}
        />
      </Canvas>

      {!builderMode && (
        <div className="viewer-instruction">
          DRAG TO ROTATE
        </div>
      )}
    </div>
  );
}

useGLTF.preload("/models/Pizza.glb");
useGLTF.preload("/models/Pizza_unmeshed.glb");

Object.values(TOPPING_MODEL_PATHS).forEach((path) => {
  useGLTF.preload(path);
});
