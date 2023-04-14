import { Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect } from "react";
import { useSceneStore } from "state/canvas";
import { useGameStore } from "state/game";
import { useModelStore } from "state/model";
import { useUIStore } from "state/ui";
import { Mesh, MeshPhysicalMaterial, Object3D, Vector3 } from "three";

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
  const materialProps = useControls({
    thickness: { value: 20, min: 0, max: 20 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
    clearcoatRoughness: { value: 0.5, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
    ior: { value: 1.45, min: 1, max: 2.3, step: 0.05 },
    color: "#ffffff",
    side: 2,
  });
  const material = new MeshPhysicalMaterial({ ...materialProps });

  const cameraOrigin = new Vector3(0, 1.5, -1.2);
  // Update model to render physics using the frame loop hook
  useFrame(({ gl, scene, camera }, delta) => {
    const returnCamera = setTimeout(() => {
      if (camera.position !== cameraOrigin) {
        camera.position.lerp(cameraOrigin, 10 * delta);
      }
    }, 1000);
    const body = vrm?.scene.children[1].children[0];
    if (body) (body as Mesh).material = material;
    // console.log(body);

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
  else
    return (
      <group>
        <primitive object={vrm.scene} />
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/modern_buildings_2_1k.hdr" />
      </group>
    );
}
