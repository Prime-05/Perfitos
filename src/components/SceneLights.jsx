import { useEffect, useRef } from "react";

/**
 * Centralised lighting for all three‑js scenes.
 * - Lowered ambient & directional intensities for better text contrast.
 * - Optional fire‑glow point‑light that animates only when `fireActive` is true.
 * - All values are chosen to stay performant on typical hardware.
 */
export default function SceneLights({ fireActive = false }) {
    const fireLight = useRef();

    // Animate the fire‑glow intensity – same logic that the Story page used.
    useEffect(() => {
        if (!fireLight.current) return;

        const target = fireActive ? 14 : 0;
        const damp = (src, dst, smooth, delta) =>
            src + (dst - src) * (1 - Math.exp(-smooth * delta));

        const animate = (state) => {
            const { delta } = state;
            fireLight.current.intensity = damp(
                fireLight.current.intensity,
                target,
                3,
                delta
            );
        };

        // three‑fiber’s render‑loop hook
        if (typeof window !== "undefined") {
            const loop = () => {
                requestAnimationFrame(loop);
                animate({ delta: 1 / 60 });
            };
            loop();
        }
    }, [fireActive]);

    return (
        <>
            {/* Soft ambient illumination */}
            <ambientLight intensity={0.15} />

            {/* Main directional key‑light */}
            <directionalLight position={[4, 6, 4]} intensity={1.1} />

            {/* Optional fire‑glow (used by the Story page) */}
            <pointLight
                ref={fireLight}
                position={[0, 1.5, 2]}
                color="#ff6a1a"
                intensity={0}
                distance={10}
            />
        </>
    );
}
