
import { state } from "state";
import { Euler, MeshStandardMaterial, Quaternion } from "three";
// VRM Imports
import { VRMUtils, VRMSchema, VRM } from '@pixiv/three-vrm';
import * as Kalidokit from 'kalidokit'

export const animateVRM = (currentVrm: VRM, results: any) => {
    if (!currentVrm) {
        return;
    }
    // console.log(results);
    // Take the results from `Holistic` and animate character based on its Face, Pose, and Hand Keypoints.
    let riggedPose, riggedLeftHand, riggedRightHand;

    // Pose 3D Landmarks are with respect to Hip distance in meters
    const pose3DLandmarks = results.ea;
    // Pose 2D landmarks are with respect to videoWidth and videoHeight
    const pose2DLandmarks = results.poseLandmarks;
    // Be careful, hand landmarks may be reversed
    const leftHandLandmarks = results.rightHandLandmarks;
    const rightHandLandmarks = results.leftHandLandmarks;

    const gltf = currentVrm.scene.children;

    const material = new MeshStandardMaterial();
    material.color.setHSL(0.50, 1, 0.5);  // red
    material.flatShading = true;
    const material1 = new MeshStandardMaterial();
    material1.color.setHSL(0, 0, 1);  // white
    material1.flatShading = true;
    const material2 = new MeshStandardMaterial();
    material2.color.setHSL(1.92, 0.66, 0.35);  // white
    material2.flatShading = true;

    gltf.forEach((child: any) => {
        if (child.material) {
            if (state.status === 'closed') {
                // Do something when the hand is closed
                child.material = material;
                return
            } else if (state.status === 'open') {
                // Do something when the hand is open
                child.material = material1;
                return
            } else if (state.status === 'point') {
                // Do something when the hand is pointed
                child.material = material2;
                return
            }

        }
    })

    // Animate Rotation Helper function
    function rigRotation(name: string,
        rotation = { x: 0, y: 0, z: 0 },
        dampener = 1,
        lerpAmount = 0.3) {
        if (!currentVrm) { return; }
        const Part = currentVrm.humanoid.getRawBoneNode(VRMSchema.HumanoidBoneName[name]);

        if (!Part) { return; }

        let euler = new Euler(
            rotation.x * dampener,
            rotation.y * dampener,
            rotation.z * dampener
        );
        let quaternion = new Quaternion().setFromEuler(euler);
        Part.quaternion.slerp(quaternion, lerpAmount); // interpolate
    }

    const videoElement = document.querySelector(".input_video") as HTMLVideoElement;
    // Animate Pose
    if (pose2DLandmarks && pose3DLandmarks) {
        riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, {
            runtime: "mediapipe",
            video: videoElement,
        }) as Kalidokit.TPose;
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

        rigRotation("Chest", riggedPose.Spine, 0.25, .3);
        rigRotation("Spine", riggedPose.Spine, 0.45, .3);

        rigRotation("RightUpperArm", riggedPose.RightUpperArm, 1, .3);
        rigRotation("RightLowerArm", riggedPose.RightLowerArm, 1, .3);
        rigRotation("LeftUpperArm", riggedPose.LeftUpperArm, 1, .3);
        rigRotation("LeftLowerArm", riggedPose.LeftLowerArm, 1, .3);

        // rigRotation("LeftUpperLeg", riggedPose.LeftUpperLeg, 1, .3);
        // rigRotation("LeftLowerLeg", riggedPose.LeftLowerLeg, 1, .3);
        // rigRotation("RightUpperLeg", riggedPose.RightUpperLeg, 1, .3);
        // rigRotation("RightLowerLeg", riggedPose.RightLowerLeg, 1, .3);
    }
    // Animate Hands
    if (leftHandLandmarks) {
        riggedLeftHand = Kalidokit.Hand.solve(leftHandLandmarks, "Left") as Kalidokit.THand<Kalidokit.Side>;
        rigRotation("LeftHand", {
            // Combine pose rotation Z and hand rotation X Y
            z: riggedPose?.LeftHand.z as number,
            y: riggedLeftHand.LeftWrist.y,
            x: riggedLeftHand.LeftWrist.x
        });
        rigRotation("LeftRingProximal", riggedLeftHand.LeftRingProximal);
        rigRotation("LeftRingIntermediate", riggedLeftHand.LeftRingIntermediate);
        rigRotation("LeftRingDistal", riggedLeftHand.LeftRingDistal);
        rigRotation("LeftIndexProximal", riggedLeftHand.LeftIndexProximal);
        rigRotation("LeftIndexIntermediate", riggedLeftHand.LeftIndexIntermediate);
        rigRotation("LeftIndexDistal", riggedLeftHand.LeftIndexDistal);
        rigRotation("LeftMiddleProximal", riggedLeftHand.LeftMiddleProximal);
        rigRotation("LeftMiddleIntermediate", riggedLeftHand.LeftMiddleIntermediate);
        rigRotation("LeftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
        rigRotation("LeftThumbProximal", riggedLeftHand.LeftThumbProximal);
        rigRotation("LeftThumbIntermediate", riggedLeftHand.LeftThumbIntermediate);
        rigRotation("LeftThumbDistal", riggedLeftHand.LeftThumbDistal);
        rigRotation("LeftLittleProximal", riggedLeftHand.LeftLittleProximal);
        rigRotation("LeftLittleIntermediate", riggedLeftHand.LeftLittleIntermediate);
        rigRotation("LeftLittleDistal", riggedLeftHand.LeftLittleDistal);
    }
    if (rightHandLandmarks) {
        riggedRightHand = Kalidokit.Hand.solve(rightHandLandmarks, "Right") as Kalidokit.THand<Kalidokit.Side>;
        rigRotation("RightHand", {
            // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
            z: riggedPose?.RightHand.z as number,
            y: riggedRightHand.RightWrist.y,
            x: riggedRightHand.RightWrist.x
        });
        rigRotation("RightRingProximal", riggedRightHand.RightRingProximal);
        rigRotation("RightRingIntermediate", riggedRightHand.RightRingIntermediate);
        rigRotation("RightRingDistal", riggedRightHand.RightRingDistal);
        rigRotation("RightIndexProximal", riggedRightHand.RightIndexProximal);
        rigRotation("RightIndexIntermediate", riggedRightHand.RightIndexIntermediate);
        rigRotation("RightIndexDistal", riggedRightHand.RightIndexDistal);
        rigRotation("RightMiddleProximal", riggedRightHand.RightMiddleProximal);
        rigRotation("RightMiddleIntermediate", riggedRightHand.RightMiddleIntermediate);
        rigRotation("RightMiddleDistal", riggedRightHand.RightMiddleDistal);
        rigRotation("RightThumbProximal", riggedRightHand.RightThumbProximal);
        rigRotation("RightThumbIntermediate", riggedRightHand.RightThumbIntermediate);
        rigRotation("RightThumbDistal", riggedRightHand.RightThumbDistal);
        rigRotation("RightLittleProximal", riggedRightHand.RightLittleProximal);
        rigRotation("RightLittleIntermediate", riggedRightHand.RightLittleIntermediate);
        rigRotation("RightLittleDistal", riggedRightHand.RightLittleDistal);
    }
};