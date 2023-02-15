import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useSceneStore } from "state/canvas";
import { useGameStore } from "state/game";
import { useModelStore } from "state/model";
import { useUIStore } from "state/ui";
import { Object3D } from "three";

// VRM
export default function Body(): JSX.Element {
  const vrm = useSceneStore((state) => state.vrm);
  const playing = useGameStore((state) => state.playing);
  const setStatus = useUIStore((state) => state.setStatus);
  const animate = useSceneStore((state) => state.animate);
  const input = useModelStore((state) => state.input);
  const results = useModelStore((state) => state.results);
  const { scene } = useThree();

  // Debug vrm
  let helperRoot: Object3D<Event> | undefined;
  useEffect(() => {
    helperRoot = new Object3D();
    helperRoot.renderOrder = 10000;
    scene.add(helperRoot);
  }, []);

  const load = useSceneStore((state) => state.load);
  useEffect(() => {
    if (!vrm) load(setStatus, helperRoot);
  }, []);

  // Update model to render physics using the frame loop hook
  useFrame(({ gl, scene, camera }, delta) => {
    if (vrm)
      if (vrm && playing && input && results)
        animate(delta, vrm, input, results);

    // gl.render(scene, camera);
  });

  if (!vrm) return <></>;
  else return <primitive object={vrm.scene} />;
}
