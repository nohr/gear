import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useCallback } from "react";
import { useSceneStore } from "state/canvas";
import { Group, Vector3 } from "three";

export default function GameBoard() {
  const box = useRef<Group>(null!);
  const vrm = useSceneStore((state) => state.vrm);

  const focusHand = useCallback(() => {
    const focusedBone = vrm?.scene.getObjectByProperty(
      "name",
      "mixamorigLeftHandIndex1",
    );
    // console.log(focusedBone);
    const target = focusedBone?.getWorldPosition(
      new Vector3(0, 0, 0),
    ) as Vector3;

    return target;
  }, [vrm]);

  useFrame(() => {
    const target = focusHand();
    if (box.current && target) box.current.position.lerp(target, 0.1);
  });

  return (
    <group ref={box}>
      <Html center>
        <div className="absolute z-20 flex h-60 w-60 flex-col items-center justify-center border border-current">
          Hi there
        </div>
      </Html>
    </group>
  );
}
