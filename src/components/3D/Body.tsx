import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useSceneStore } from "state/canvas";
import { useGameStore } from "state/game";
import { useModelStore } from "state/model";
import { useUIStore } from "state/ui";
import { Object3D, Vector3 } from "three";

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

  const cameraOrigin = new Vector3(0, 1.5, -1.2);
  // Update model to render physics using the frame loop hook
  useFrame(({ gl, scene, camera }, delta) => {
    const returnCamera = setTimeout(() => {
      if (camera.position !== cameraOrigin) {
        camera.position.lerp(cameraOrigin, 10 * delta);
      }
    }, 1000);

    if (vrm)
      if (vrm && playing && input && results) {
        animate(delta, vrm, input, results);
        // follow arm with camera if hand is detected
        if (results.rightHandLandmarks) {
          clearTimeout(returnCamera);
          const armBone = vrm.scene.getObjectByProperty(
            "name",
            "mixamorigLeftHand"
          );
          const target = armBone?.getWorldPosition(
            new Vector3(0, 0, 0)
          ) as Vector3;
          camera.lookAt(target.x, target.y, target.z);
          camera.position.lerp(
            new Vector3(target.x, target.y + 0.1, target.z - 0.5),
            0.5
          );
        }
      }
  });

  if (!vrm) return <></>;
  else return <primitive object={vrm.scene} />;
}
