import Composition from "3D/Canvas";
import Cameras from "ML/Cameras";
import { VRMProvider } from "context";
import { HolisticProvider } from "common/context/context.holistic";

export default function Bind() {
  return (
    <HolisticProvider>
      <VRMProvider>
        <Cameras />
        <Composition />
      </VRMProvider>
    </HolisticProvider>
  );
}
