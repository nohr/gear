import {
  Environment,
  Html,
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
      linear
      className={`absolute z-20`}
      frameloop={cameraStarted ? (playing ? "always" : "demand") : "demand"}
    >
      {cameraStarted ? (
        <>
          <PerspectiveCamera makeDefault fov={60} position={[0, 0.22, 1.2]} />
          <Suspense fallback={<p>Loading...</p>}>
            {/* <Game /> */}
            <Body />
            {playing ? (
              <>
                <spotLight intensity={1} position={[0, 2.8, 7]} />
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
          <OrbitControls target={[0, 0.22, 0]} />
          <Environment
            path="/"
            files={"images/studio_small_04_1k.hdr"}
            resolution={256}
          />
        </>
      ) : (
        // Fallback
        <Html
          as="div"
          className="absolute top-1/2 left-1/2 z-0 w-max"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <p className="w-max">Press Space</p>
        </Html>
      )}
    </Canvas>
  );
}
