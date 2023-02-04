import { useFrame } from "@react-three/fiber";
import { useContext, useEffect } from "react";
import { state } from "state";
import { useSnapshot } from "valtio";
import { VRMContext } from "context";
import { loadVRM } from "utils";

// VRM
export default function Body() {
  const { playing, vrmLoaded } = useSnapshot(state);
  const { vrm } = useContext(VRMContext);

  useEffect(() => {
    !vrmLoaded ? loadVRM(vrm) : null;
  }, []);

  // Update model to render physics using the frame loop hook
  useFrame(({ gl, scene, camera }, delta) => {
    if (vrm.current && playing) {
      vrm.current.update(delta);
    }
    gl.render(scene, camera);
  }, 1);

  return <>{vrmLoaded ? <primitive object={vrm.current.scene} /> : null}</>;
}
