import { useFrame } from "@react-three/fiber";
import { Suspense, useContext, useEffect } from "react";
import { state } from "state";
import { useSnapshot } from "valtio";
import { HolisticContext, VRMContext } from "context";
import { loadVRM } from "utils";
// VRM
export default function Body() {
  const { playing, vrmLoaded } = useSnapshot(state);
  const { animate, vrm } = useContext(VRMContext);
  const { input } = useContext(HolisticContext);

  useEffect(() => {
    !vrmLoaded ? loadVRM(vrm) : null;
  }, []);

  // Update model to render physics using the frame loop hook
  useFrame(({ gl, scene, camera }, delta) => {
    if (vrm.current && input.current && playing) {
      animate();
      vrm.current.update(delta);
    }
    gl.render(scene, camera);
  }, 1);

  return (
    <Suspense fallback={<p>Loading</p>}>
      {vrmLoaded ? <primitive object={vrm.current.scene} /> : null}
    </Suspense>
  );
}
