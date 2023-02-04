import type { VRM } from "@pixiv/three-vrm";
import { useFrame, useThree } from "@react-three/fiber";
import useVRM from "common/hooks/useVRM";
import { useEffect, useRef, useState } from "react";
import { state } from "state";
import { useSnapshot } from "valtio";
import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { loadVRMFromLocalStorage } from "utils";

// VRM
export default function Body() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const { clock, scene } = useThree();
  const { playing, vrmLoaded, cameraStarted } = useSnapshot(state);
  const vrm = useRef<VRM | null>(null);

  useEffect(() => {
    const loadVRM = async () => {
      try {
        // Check Local Storage for a VRM
        const localVrm: VRM | null = await loadVRMFromLocalStorage();
        if (localVrm !== null) {
          vrm.current = localVrm;
          setLoading(false);
        } else {
          let url = "/models/fullbody.vrm";
          // Load a VRM from hosting
          const loader = new GLTFLoader();
          loader.register((parser) => {
            return new VRMLoaderPlugin(parser);
          });
          // load VRM
          loader.load(
            url,
            async (gltf) => {
              VRMUtils.removeUnnecessaryJoints(gltf.scene);
              vrm.current = (await gltf.userData.vrm) as VRM;
              scene.add(vrm.current.scene);
              // console.log("added", current);
              vrm.current.scene.rotation.y = Math.PI;
              vrm.current.scene.position.y = -1.35;
              state.vrmLoaded = true;
              // FIXME: reduce vrm size and cache it
              // convert to base64 and save to local storage
              // let reader = new FileReader();
              // reader.readAsDataURL(blobVrm);
              // reader.onload = function () {
              //     localStorage.setItem("vrm", JSON.stringify(reader.result));
              // };
              // reader.onerror = function (error) {
              //     console.log('Error: ', error);
              // };
            },
            (progress) => {
              state.status =
                100.0 * (progress.loaded / progress.total) === 100.0
                  ? "100% armed"
                  : progress.loaded / progress.total <= 1.0
                  ? `${Math.floor(
                      100.0 * (progress.loaded / progress.total)
                    )}% armed...`
                  : "Overloaded! Now resolving...";
            },
            (error) => setError(error)
          );
        }
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error(e);
      }
    };
    if (!vrmLoaded) loadVRM();
  }, []);

  // useEffect(() => {

  //   if (current && !vrmLoaded) {
  //     current.scene.visible = true;
  //     scene.add(current.scene);
  //     // console.log("added", current);
  //     current.scene.rotation.y = Math.PI;
  //     current.scene.position.y = -1.35;
  //     state.vrmLoaded = true;
  //   }
  // }, [current, vrmLoaded, scene]);

  // Update model to render physics using the frame loop hook
  useFrame(({ gl, scene, camera }) => {
    if (vrm.current && !cameraStarted) vrm.current.scene.visible = false;
    if (vrm.current && playing) {
      vrm.current.scene.visible = true;
      vrm.current.update(clock.getDelta());
    }
    gl.render(scene, camera);
  }, 1);
  return null;
}
