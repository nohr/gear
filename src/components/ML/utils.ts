import { state } from "state";
import {
    Holistic,
    VERSION
} from '@mediapipe/holistic'
import { Camera } from '@mediapipe/camera_utils'
// @ts-ignore
import * as handTrack from 'handtrackjs';

/* WORLD SETUP */
let currentVrm: any;
let videoElement: Element | null;
let videoElement2: Element | null;

/* VRM Character Animator */
const animateVRM = (vrm, results) => {
    if (!vrm) {
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

    const gltf = vrm.scene.children;

    const material = new MeshStandardMaterial();
    material.color.setHSL(0.50, 1, 0.5);  // red
    material.flatShading = true;
    const material1 = new MeshStandardMaterial();
    material1.color.setHSL(0, 0, 1);  // white
    material1.flatShading = true;
    const material2 = new MeshStandardMaterial();
    material2.color.setHSL(1.92, 0.66, 0.35);  // white
    material2.flatShading = true;

    gltf.forEach((child) => {
        if (child.material) {


            if (state.load === 'closed') {
                // Do something when the hand is closed
                child.material = material;
                return
            } else if (state.load === 'open') {
                // Do something when the hand is open
                child.material = material1;
                return
            } else if (state.load === 'point') {
                // Do something when the hand is pointed
                child.material = material2;
                return
            }

        }
    })

    // Animate Pose
    if (pose2DLandmarks && pose3DLandmarks) {
        riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, {
            runtime: "mediapipe",
            video: videoElement,
        });
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
        riggedLeftHand = Kalidokit.Hand.solve(leftHandLandmarks, "Left");
        rigRotation("LeftHand", {
            // Combine pose rotation Z and hand rotation X Y
            z: riggedPose.LeftHand.z,
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
        riggedRightHand = Kalidokit.Hand.solve(rightHandLandmarks, "Right");
        rigRotation("RightHand", {
            // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
            z: riggedPose.RightHand.z,
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

const onResults = (results: any) => {
    // Animate model if there is video
    if (currentVrm) {
        if (state.model && !state.location.x && !state.location.y && state.load !== 'Ready') {
            state.load = 'Ready';
            state.ready = true;
        };
        animateVRM(currentVrm, results);
    };
};


export const activateDraw = (ref: HTMLCanvasElement) => {
    videoElement = document.querySelector(".input_video");
    videoElement2 = document.querySelector(".input_video2");
    /* SETUP MEDIAPIPE HOLISTIC */
    const holistic = new Holistic({
        locateFile: (file: string) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@${VERSION}/${file}`;
        },
    });

    if (holistic) {
        state.status = "Holistic loaded";
    }

    holistic.setOptions({
        selfieMode: state.selfie,
        modelComplexity: 1,
        // upperBodyOnly: false,
        smoothLandmarks: true,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
        refineFaceLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
    });

    // Pass holistic a callback function
    holistic.onResults(onResults);

    // camera.start()
    if (state.cameraStarted) {
        // Use `Mediapipe` utils to get camera - lower resolution = higher fps
        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await holistic.send({ image: videoElement });
            },
            width: 640,
            height: 480,
        });
        camera.start();
    }
    /* SETUP HANDTRACK.JS */
    let model;
    let startBtn = document.querySelector(".start");

    // Stop model
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            console.log("stop");
            if (state.started === true) {
                handTrack.stopVideo(videoElement2);
                model.dispose();
                state.load = "Model disposed, press Start to reload it";
            }
        });
    }

    const modelParams = {
        flipHorizontal: true, // flip e.g for video
        maxNumBoxes: 3, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression
        scoreThreshold: 0.7, // confidence threshold for predictions.
        modelType: "ssd320fpnlite",
        modelSize: "large",
    };

    if (state.cameraStarted) {
        handTrack.startVideo(videoElement2).then(function (status) {
            state.load = `video started, ${status}`;
            if (status) {
                state.status = "Video started, loading model...";
                // Load the model then send it to detection animation frame
                handTrack
                    .load(modelParams)
                    .then((lmodel) => {
                        model = lmodel;
                        state.status = "Model loaded, running detection...";
                        model.model = true;
                        return model;
                    })
                    .then((model) => {
                        function runDetection() {
                            if (videoElement2) {
                                // videoElement2.addEventListener("loadeddata", () => {
                                // console.log('videodata loaded!');
                                model.detect(videoElement2).then((predictions) => {
                                    predictions.forEach((one) => {
                                        // Only Detect right half of screen
                                        // let xCord = parseInt(one.bbox[0]);
                                        // if ((state.selfie && xCord <= 320) || (!state.selfie && xCord >= 320)) {
                                        if (
                                            one.label === "open" ||
                                            one.label === "closed" ||
                                            one.label === "point"
                                        ) {
                                            //Start game if hand sign is detected
                                            one.bbox.forEach((num) => {
                                                if (
                                                    !state.gameReady &&
                                                    !state.gameStarted &&
                                                    state.cameraStarted === true &&
                                                    num
                                                ) {
                                                    state.gameReady = true;
                                                }
                                            });
                                            state.load = `${one.label}`;
                                            state.location.x = parseInt(one.bbox[0]);
                                            state.location.y = parseInt(one.bbox[1]);
                                            state.location.w = parseInt(one.bbox[2]);
                                            state.location.h = parseInt(one.bbox[3]);
                                            state.started = true;
                                        }
                                        // }
                                    });
                                    requestAnimationFrame(runDetection);
                                });
                                // })
                            }
                        }
                        if (state.cameraStarted === true) {
                            runDetection();
                        }
                    });
            } else {
                state.status = "Please enable video";
            }
        });
    }
};