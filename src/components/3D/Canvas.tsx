import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { state } from "state";
import { useSnapshot } from "valtio";
import Body from "./Body";

// React Three Fiber Canvas
export default function Composition() {
  const { cameraStarted, playing } = useSnapshot(state);

  return (
    <Canvas
      onCompositionUpdate={(e) => console.log(e)}
      linear
      className="absolute z-20"
      frameloop={cameraStarted ? (playing ? "always" : "demand") : "always"}
    >
      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 1.25]} />
      <Suspense fallback={<p>Loading...</p>}>
        {/* <Game /> */}
        <Body />
        {playing ? (
          <>
            <spotLight intensity={0.7} position={[0, 2.8, 7]} />
            {/* {snap.effects && (
              <EffectComposer multisampling={2}>
                <Bloom
                  kernelSize={1}
                  luminanceThreshold={0}
                  luminanceSmoothing={0.3}
                  intensity={0.8}
                />
                <Bloom
                  kernelSize={KernelSize.HUGE}
                  luminanceThreshold={0}
                  luminanceSmoothing={1}
                  intensity={1}
                />
              </EffectComposer>
            )} */}
          </>
        ) : null}
      </Suspense>
      <OrbitControls target={[0, 0, 0]} />
      <Environment
        path="/"
        files={"images/studio_small_04_1k.hdr"}
        resolution={256}
      />
    </Canvas>
  );
}
