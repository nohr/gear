import { Grid, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useGameStore } from "state/game";
import { useUIStore } from "state/ui";
import { shallow } from "zustand/shallow";
import Body from "./Body";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { useRef } from "react";

export default function Composition() {
  const [playing, started] = useGameStore(
    (state) => [state.playing, state.started],
    shallow
  );
  const theme = useUIStore((state) => state.theme);
  const depthBokeh = useRef(null);

  return (
    <Canvas
      linear
      dpr={[1, 2]}
      className={`absolute z-20 touch-none`}
      frameloop={started ? (playing ? "always" : "demand") : "demand"}
      camera={{
        fov: 80,
        position: [0, 1.5, -1.2],
        near: 0.01,
        far: 100,
      }}
    >
      <Body depthBokeh={depthBokeh} />
      <spotLight intensity={playing ? 1 : 0.3} position={[0, 2.8, -7]} />
      <spotLight intensity={playing ? 1 : 0.3} position={[0, 4, 1]} />
      <Grid
        position={[0, -0.01, 0]}
        infiniteGrid
        fadeDistance={10}
        fadeStrength={5}
        sectionThickness={1.5}
        sectionColor={theme === "light" ? "#fe3632" : "#ccff66"}
        cellThickness={1}
        cellSize={0.5}
        cellColor={theme === "light" ? "#006ebc" : "#bebebe"}
      />
      <EffectComposer>
        <DepthOfField
          ref={depthBokeh}
          focusDistance={0}
          focalLength={0.15}
          bokehScale={0}
        />
      </EffectComposer>
      <Stats showPanel={0} className="stats" />
      <OrbitControls makeDefault target={[0, 1.57, 0]} />
    </Canvas>
  );
}
