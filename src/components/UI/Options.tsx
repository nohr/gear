import { state } from "state";
import { useSnapshot } from "valtio";
import { OptionsButton } from "./OptionsButton";

export default function Options() {
  const { cameraStarted } = useSnapshot(state);
  return (
    <div className="flex select-none flex-row gap-x-4">
      <OptionsButton num={0} />
      <OptionsButton num={1} />
      <OptionsButton num={2} />
      {cameraStarted ? <OptionsButton num={3} /> : null}
    </div>
  );
}
