
import { useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  useGLTF,
} from "@react-three/drei";

/* Toppings that load their own .glb file */
const TOPPING_MODEL_PATHS = {
  pepper: "/models/pepper.glb",
  mushroom: "/models/mushroom.glb",
  tomato: "/models/tomato.glb",
};

/* Toppings that already exist as meshes inside Pizza_unmeshed.glb.
   Each id maps to words found in the mesh name. */
const MESH_TOPPINGS = {
  salami: ["salami"],
  basil: ["leaves", "basil"],
  cheese: ["cheese"],
};

/* Original tomato mesh in the model: always hidden in the builder,
   because the Tomato option loads tomato.glb instead. */
const ALWAYS_HIDDEN = ["tomatoes"];

/* Name of a mesh plus all its parents, so it matches even if the
   keyword is on a parent group instead of the mesh itself */
function getFullName(object) {
  let name = "";
  let node = object;
  while (node) {
    name += " " + (node.name || "").toLowerCase();
    node = node.parent;
  }
  return name;
}

function PizzaModel({ modelPath, builderMode, meshToppings }) {
  const { scene } = useGLTF(modelPath);

  const clonedScene = useMemo(
    () => scene.clone(true),
    [scene]
  );

  useEffect(() => {
    if (!builderMode) return;

    clonedScene.traverse((object) => {
      if (!object.isMesh) return;

      const name = getFullName(object);

      // console.log("MESH:", name); // uncomment to see every mesh name

      if (ALWAYS_HIDDEN.some((word) => name.includes(word))) {
        object.visible = false;
        return;
      }

      for (const [id, words] of Object.entries(MESH_TOPPINGS)) {
        if (words.some((word) => name.includes(word))) {
          object.visible = meshToppings.includes(id);
        }
      }
    });
  }, [clonedScene, builderMode, meshToppings]);

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
  
}) {
     const meshToppings = toppings.filter((id) => MESH_TOPPINGS[id]);
     const modelToppings = toppings.filter((id) => TOPPING_MODEL_PATHS[id]);
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
           meshToppings={meshToppings}
           />

        <group scale={2.5} position={[0, -0.9, 0]}>
          {modelToppings.map((id) => (
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
