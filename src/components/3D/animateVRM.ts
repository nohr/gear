
import { Euler, Quaternion } from "three";
// VRM Imports
import type { VRM, VRMHumanBoneName } from '@pixiv/three-vrm';
import { Pose, Hand, TPose, THand, Side } from "kalidokit";


export const animateVRM = (currentVrm: VRM, results: any, hollisticInput: HTMLVideoElement) => {
    // Take the results from `Holistic` and animate character based on its Face, Pose, and Hand Keypoints.
    let riggedPose, riggedLeftHand, riggedRightHand;

    const { ea, poseLandmarks } = results
    // Pose 3D Landmarks are with respect to Hip distance in meters
    const pose3DLandmarks = ea;
    // Pose 2D landmarks are with respect to videoWidth and videoHeight
    const pose2DLandmarks = poseLandmarks;
    // Be careful, hand landmarks may be reversed
    const leftHandLandmarks = results.rightHandLandmarks;
    const rightHandLandmarks = results.leftHandLandmarks;


    // Animate Rotation Helper function
    function rigRotation(name: VRMHumanBoneName,
        rotation = { x: 0, y: 0, z: 0 },
        dampener = 1,
        lerpAmount = 0.3) {
        if (!currentVrm) { return; }
        const Part = currentVrm.humanoid.getRawBoneNode(name);

        if (!Part) { return; }

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
            video: hollisticInput,
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

        rigRotation("chest", riggedPose.Spine, 0.25, .3);
        rigRotation("spine", riggedPose.Spine, 0.45, .3);

        rigRotation("rightUpperArm", riggedPose.RightUpperArm, 1, .3);
        rigRotation("rightLowerArm", riggedPose.RightLowerArm, 1, .3);
        rigRotation("leftUpperArm", riggedPose.LeftUpperArm, 1, .3);
        rigRotation("leftLowerArm", riggedPose.LeftLowerArm, 1, .3);

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
            x: riggedLeftHand.LeftWrist.x
        });
        rigRotation("leftRingProximal", riggedLeftHand.LeftRingProximal);
        rigRotation("leftRingIntermediate", riggedLeftHand.LeftRingIntermediate);
        rigRotation("leftRingDistal", riggedLeftHand.LeftRingDistal);
        rigRotation("leftIndexProximal", riggedLeftHand.LeftIndexProximal);
        rigRotation("leftIndexIntermediate", riggedLeftHand.LeftIndexIntermediate);
        rigRotation("leftIndexDistal", riggedLeftHand.LeftIndexDistal);
        rigRotation("leftMiddleProximal", riggedLeftHand.LeftMiddleProximal);
        rigRotation("leftMiddleIntermediate", riggedLeftHand.LeftMiddleIntermediate);
        rigRotation("leftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
        rigRotation("leftThumbProximal", riggedLeftHand.LeftThumbProximal);
        rigRotation("leftThumbMetacarpal", riggedLeftHand.LeftThumbIntermediate);
        rigRotation("leftThumbDistal", riggedLeftHand.LeftThumbDistal);
        rigRotation("leftLittleProximal", riggedLeftHand.LeftLittleProximal);
        rigRotation("leftLittleIntermediate", riggedLeftHand.LeftLittleIntermediate);
        rigRotation("leftLittleDistal", riggedLeftHand.LeftLittleDistal);
    }
    if (rightHandLandmarks) {
        riggedRightHand = Hand.solve(rightHandLandmarks, "Right") as THand<Side>;
        rigRotation("rightHand", {
            // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
            z: riggedPose?.RightHand.z as number,
            y: riggedRightHand.RightWrist.y,
            x: riggedRightHand.RightWrist.x
        });
        rigRotation("rightRingProximal", riggedRightHand.RightRingProximal);
        rigRotation("rightRingIntermediate", riggedRightHand.RightRingIntermediate);
        rigRotation("rightRingDistal", riggedRightHand.RightRingDistal);
        rigRotation("rightIndexProximal", riggedRightHand.RightIndexProximal);
        rigRotation("rightIndexIntermediate", riggedRightHand.RightIndexIntermediate);
        rigRotation("rightIndexDistal", riggedRightHand.RightIndexDistal);
        rigRotation("rightMiddleProximal", riggedRightHand.RightMiddleProximal);
        rigRotation("rightMiddleIntermediate", riggedRightHand.RightMiddleIntermediate);
        rigRotation("rightMiddleDistal", riggedRightHand.RightMiddleDistal);
        rigRotation("rightThumbProximal", riggedRightHand.RightThumbProximal);
        rigRotation("rightThumbMetacarpal", riggedRightHand.RightThumbIntermediate);
        rigRotation("rightThumbDistal", riggedRightHand.RightThumbDistal);
        rigRotation("rightLittleProximal", riggedRightHand.RightLittleProximal);
        rigRotation("rightLittleIntermediate", riggedRightHand.RightLittleIntermediate);
        rigRotation("rightLittleDistal", riggedRightHand.RightLittleDistal);
    }
};