import { Environment } from "@react-three/drei";
import { Camera, useFrame } from "@react-three/fiber";
// import { useControls } from "leva";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSceneStore } from "state/canvas";
import { useGameStore } from "state/game";
import { useModelStore } from "state/model";
import { useUIStore } from "state/ui";
import { Mesh, MeshPhysicalMaterial, PerspectiveCamera, Vector3 } from "three";
import { shallow } from "zustand/shallow";

// VRM
export default function Body({
  depthBokeh,
}: {
  depthBokeh: React.MutableRefObject<any>;
}): JSX.Element {
  const [vrm, animate, load] = useSceneStore(
    (state) => [state.vrm, state.animate, state.load],
    shallow
  );
  const [playing, setPanel] = useGameStore(
    (state) => [state.playing, state.setPanel],
    shallow
  );
  const setStatus = useUIStore((state) => state.setStatus);
  const input = useModelStore((state) => state.input);

  // Debug vrm
  // const { scene } = useThree();
  // let helperRoot: Object3D<Event> | undefined;
  // useEffect(() => {
  //   helperRoot = new Object3D();
  //   helperRoot.renderOrder = 10000;
  //   scene.add(helperRoot);
  // }, []);

  // Load vrm
  useEffect(() => {
    if (!vrm) load(setStatus);
    // if (!vrm) load(setStatus, helperRoot);
  }, []);

  // subscribe to results
  const resultsRef = useRef(useModelStore.getState().results);
  useEffect(() => {
    const unsub = useModelStore.subscribe(
      (state) => (resultsRef.current = state.results)
    );
    return () => unsub();
  }, [playing]);

  const materialProps = {
    thickness: 20,
    roughness: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.5,
    transmission: 1,
    reflectivity: 0.5,
    ior: 1.45,
    iridescenceIOR: 1.6,
    iridescence: 0.1,
    color: "#ffffff",
    side: 2,
  };
  const material = new MeshPhysicalMaterial({ ...materialProps });

  const cameraOrigin = useMemo(() => new Vector3(0, 1.5, -1.2), []);

  const followCamera = useCallback(
    (camera: Camera, returnCamera: NodeJS.Timeout) => {
      setPanel(true);
      clearTimeout(returnCamera);
      const focusedBone = vrm?.scene.getObjectByProperty(
        "name",
        "mixamorigLeftHandIndex1"
      );
      // console.log(focusedBone);
      const target = focusedBone?.getWorldPosition(
        new Vector3(0, 0, 0)
      ) as Vector3;
      (camera as PerspectiveCamera).fov = 100;
      if ((camera as PerspectiveCamera).fov < 100)
        (camera as PerspectiveCamera).fov++;
      camera.lookAt(target.x, target.y, target.z);
      camera.position.lerp(
        new Vector3(target.x, target.y, target.z - 0.25),
        0.25
      );
    },
    [vrm]
  );

  // Update model to render physics using the frame loop hook
  useFrame(({ gl, scene, camera }, delta) => {
    const returnCamera = setTimeout(() => {
      setPanel(false);
      if (depthBokeh.current && depthBokeh.current.bokehScale > 0)
        depthBokeh.current.bokehScale--;
      if ((camera as PerspectiveCamera).fov > 80)
        (camera as PerspectiveCamera).fov--;
      if (camera.position !== cameraOrigin) {
        camera.position.lerp(cameraOrigin, 10 * delta);
      }
    }, 500);

    const body = vrm?.scene.children[1].children[0];
    if (body) (body as Mesh).material = material;

    if (vrm)
      if (vrm && playing && input && resultsRef.current) {
        // animate vrm
        animate(delta, vrm, input, resultsRef.current);
      }
    // follow hand with camera if detected
    if (resultsRef.current && resultsRef.current.rightHandLandmarks) {
      // console.log(depthBokeh.current);
      if (depthBokeh.current.bokehScale < 20) depthBokeh.current.bokehScale++;
      followCamera(camera, returnCamera);
    }
  });

  return (
    <group>
      {vrm?.scene ? (
        <>
          <primitive object={vrm.scene} />
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/modern_buildings_2_1k.hdr" />
        </>
      ) : null}
    </group>
  );
}
