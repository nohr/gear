import { state } from "state";
import { useSnapshot } from "valtio";

// React Three Fiber Canvas
export default function Composition() {
  const snap = useSnapshot(state);
  return (
    <Canvas
      linear
      className="threeCanvas"
      frameloop={snap.started ? (snap.start ? "always" : "demand") : "always"}
    >
      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 1.25]} />
      <Suspense fallback={null}>
        <Game />
        {snap.start && (
          <>
            <spotLight intensity={0.7} position={[0, 2.8, 7]} />
            <Arm />
            {snap.effects && (
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
            )}
          </>
        )}
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
