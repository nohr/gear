import React, { createContext, ReactNode, useContext, useRef } from "react";
import { Euler, MeshStandardMaterial, Quaternion } from "three";
import type { VRM, VRMHumanBoneName } from "@pixiv/three-vrm";
import { Pose, Hand, TPose, THand, Side } from "kalidokit";
import { HolisticContext } from "./context.holistic";

export const VRMContext = createContext<VRMProps>({
  animate: () => {},
  affect: () => {},
  vrm: { current: null },
});

export function VRMProvider({ children }: { children: ReactNode }) {
  const vrm = useRef<VRM>(null);
  const { input, results } = useContext(HolisticContext);

  const animate = () => {
    console.log(results.current, input.current);
    if (!results.current) return;

    // Take the results from `Holistic` and animate character based on its Face, Pose, and Hand Keypoints.
    let riggedPose, riggedLeftHand, riggedRightHand;

    const { ea, poseLandmarks } = results.current;

    // Pose 3D Landmarks are with respect to Hip distance in meters
    const pose3DLandmarks = ea;
    // Pose 2D landmarks are with respect to videoWidth and videoHeight
    const pose2DLandmarks = poseLandmarks;
    // Be careful, hand landmarks may be reversed
    const leftHandLandmarks = results.current.rightHandLandmarks;
    const rightHandLandmarks = results.current.leftHandLandmarks;

    // Animate Rotation Helper function
    function rigRotation(
      name: VRMHumanBoneName,
      rotation = { x: 0, y: 0, z: 0 },
      dampener = 1,
      lerpAmount = 0.3
    ) {
      if (!vrm.current) return;

      const Part = vrm.current.humanoid.getRawBoneNode(name);
      // console.log(Part);

      if (!Part) return;

      let euler = new Euler(
        rotation.x * dampener,
        rotation.y * dampener,
        rotation.z * dampener
      );
      let quaternion = new Quaternion().setFromEuler(euler);
      Part.quaternion.slerp(quaternion, lerpAmount); // interpolate
    }

    // Animate Pose
    if (pose2DLandmarks && pose3DLandmarks) {
      riggedPose = Pose.solve(pose3DLandmarks, pose2DLandmarks, {
        runtime: "mediapipe",
        video: input.current,
      }) as TPose;
      // rigRotation("Hips", riggedPose.Hips.rotation, 0.7);
      // rigPosition(
      //   "Hips",
      //   {
      //     x: -riggedPose.Hips.position.x, // Reverse direction
      //     y: riggedPose.Hips.position.y + 1, // Add a bit of height
      //     z: -riggedPose.Hips.position.z // Reverse direction
      //   },
      //   1,
      //   0.07
      // );

      rigRotation("chest", riggedPose.Spine, 0.25, 0.3);
      rigRotation("spine", riggedPose.Spine, 0.45, 0.3);

      rigRotation("rightUpperArm", riggedPose.RightUpperArm, 1, 0.3);
      rigRotation("rightLowerArm", riggedPose.RightLowerArm, 1, 0.3);
      rigRotation("leftUpperArm", riggedPose.LeftUpperArm, 1, 0.3);
      rigRotation("leftLowerArm", riggedPose.LeftLowerArm, 1, 0.3);

      // rigRotation("LeftUpperLeg", riggedPose.LeftUpperLeg, 1, .3);
      // rigRotation("LeftLowerLeg", riggedPose.LeftLowerLeg, 1, .3);
      // rigRotation("RightUpperLeg", riggedPose.RightUpperLeg, 1, .3);
      // rigRotation("RightLowerLeg", riggedPose.RightLowerLeg, 1, .3);
    }
    // Animate Hands
    if (leftHandLandmarks) {
      riggedLeftHand = Hand.solve(leftHandLandmarks, "Left") as THand<Side>;
      rigRotation("leftHand", {
        // Combine pose rotation Z and hand rotation X Y
        z: riggedPose?.LeftHand.z as number,
        y: riggedLeftHand.LeftWrist.y,
        x: riggedLeftHand.LeftWrist.x,
      });
      rigRotation("leftRingProximal", riggedLeftHand.LeftRingProximal);
      rigRotation("leftRingIntermediate", riggedLeftHand.LeftRingIntermediate);
      rigRotation("leftRingDistal", riggedLeftHand.LeftRingDistal);
      rigRotation("leftIndexProximal", riggedLeftHand.LeftIndexProximal);
      rigRotation(
        "leftIndexIntermediate",
        riggedLeftHand.LeftIndexIntermediate
      );
      rigRotation("leftIndexDistal", riggedLeftHand.LeftIndexDistal);
      rigRotation("leftMiddleProximal", riggedLeftHand.LeftMiddleProximal);
      rigRotation(
        "leftMiddleIntermediate",
        riggedLeftHand.LeftMiddleIntermediate
      );
      rigRotation("leftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
      rigRotation("leftThumbProximal", riggedLeftHand.LeftThumbProximal);
      rigRotation("leftThumbMetacarpal", riggedLeftHand.LeftThumbIntermediate);
      rigRotation("leftThumbDistal", riggedLeftHand.LeftThumbDistal);
      rigRotation("leftLittleProximal", riggedLeftHand.LeftLittleProximal);
      rigRotation(
        "leftLittleIntermediate",
        riggedLeftHand.LeftLittleIntermediate
      );
      rigRotation("leftLittleDistal", riggedLeftHand.LeftLittleDistal);
    }
    if (rightHandLandmarks) {
      riggedRightHand = Hand.solve(rightHandLandmarks, "Right") as THand<Side>;
      rigRotation("rightHand", {
        // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
        z: riggedPose?.RightHand.z as number,
        y: riggedRightHand.RightWrist.y,
        x: riggedRightHand.RightWrist.x,
      });
      rigRotation("rightRingProximal", riggedRightHand.RightRingProximal);
      rigRotation(
        "rightRingIntermediate",
        riggedRightHand.RightRingIntermediate
      );
      rigRotation("rightRingDistal", riggedRightHand.RightRingDistal);
      rigRotation("rightIndexProximal", riggedRightHand.RightIndexProximal);
      rigRotation(
        "rightIndexIntermediate",
        riggedRightHand.RightIndexIntermediate
      );
      rigRotation("rightIndexDistal", riggedRightHand.RightIndexDistal);
      rigRotation("rightMiddleProximal", riggedRightHand.RightMiddleProximal);
      rigRotation(
        "rightMiddleIntermediate",
        riggedRightHand.RightMiddleIntermediate
      );
      rigRotation("rightMiddleDistal", riggedRightHand.RightMiddleDistal);
      rigRotation("rightThumbProximal", riggedRightHand.RightThumbProximal);
      rigRotation(
        "rightThumbMetacarpal",
        riggedRightHand.RightThumbIntermediate
      );
      rigRotation("rightThumbDistal", riggedRightHand.RightThumbDistal);
      rigRotation("rightLittleProximal", riggedRightHand.RightLittleProximal);
      rigRotation(
        "rightLittleIntermediate",
        riggedRightHand.RightLittleIntermediate
      );
      rigRotation("rightLittleDistal", riggedRightHand.RightLittleDistal);
    }
  };

  const affect = (status: string) => {
    if (!vrm.current) return;
    const gltf = vrm.current.scene.children;

    const material = new MeshStandardMaterial();
    material.color.setHSL(0.5, 1, 0.5); // red
    material.flatShading = true;
    const material1 = new MeshStandardMaterial();
    material1.color.setHSL(0, 0, 1); // white
    material1.flatShading = true;
    const material2 = new MeshStandardMaterial();
    material2.color.setHSL(1.92, 0.66, 0.35); // white
    material2.flatShading = true;

    gltf.forEach((child: any) => {
      if (child.material) {
        if (status === "closed") {
          // Do something when the hand is closed
          child.material = material;
          return;
        } else if (status === "open") {
          // Do something when the hand is open
          child.material = material1;
          return;
        } else if (status === "point") {
          // Do something when the hand is pointed
          child.material = material2;
          return;
        }
      }
    });
  };
  return (
    <VRMContext.Provider
      value={{
        animate,
        affect,
        vrm,
      }}
    >
      {children}
    </VRMContext.Provider>
  );
}
