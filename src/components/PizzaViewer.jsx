import {
  Canvas,
} from "@react-three/fiber";

import {
  OrbitControls,
  Environment,
  Html,
  useGLTF,
} from "@react-three/drei";

function PizzaModel() {
  const { scene } = useGLTF("/models/Pizza.glb");

  return (
    <primitive
      object={scene}
      scale={2.5}
      position={[0, -1, 0]}
    />
  );
}

function IngredientLabel({
  position,
  title,
  description,
}) {
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

export default function PizzaViewer({ item }) {
  return (
    <div className="pizza-viewer">

      <div className="pizza-model-name">
        {item.name}
      </div>

      <Canvas
        camera={{
          position: [0, 2.5, 6],
          fov: 40,
        }}
      >
        <ambientLight intensity={1.8} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <Environment preset="studio" />

        <PizzaModel />

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

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.7}
        />
      </Canvas>

      <div className="viewer-instruction">
        DRAG TO ROTATE
      </div>

    </div>
  );
}

useGLTF.preload("/models/Pizza.glb");