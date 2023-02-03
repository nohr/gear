import { model, state } from "state";
import {
    Holistic,
    VERSION
} from '@mediapipe/holistic'
import { Camera } from '@mediapipe/camera_utils'
// @ts-ignore
import * as handTrack from 'handtrackjs';
import { animateVRM } from "3D/animateVRM";
import type { VRM } from "@pixiv/three-vrm";

/* WORLD SETUP */
let currentVrm: VRM;
let hollisticInput: HTMLVideoElement | null;
let handtrackInput: HTMLVideoElement | null;



const onResults = (results: any) => {
    // Animate model if there is video
    if (currentVrm) {
        if (model.model && !model.location[0] && !model.location[1] && state.status !== 'Ready') {
            state.status = 'Ready';
            state.gameReady = true;
        };
        animateVRM(currentVrm, results);
    };
};


export const activateDraw = (ref: HTMLCanvasElement) => {
    const hollisticInput = document.querySelector(".input_video");
    const handtrackInput = document.querySelector(".input_video2");
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
        const camera = new Camera(hollisticInput as HTMLVideoElement, {
            onFrame: async () => {
                await holistic.send({ image: hollisticInput as HTMLVideoElement });
            },
            width: 640,
            height: 480,
        });
        camera.start();
    }
    /* SETUP HANDTRACK.JS */
    let model: { dispose: () => void; model: boolean; };
    let startBtn = document.querySelector(".start");

    // Stop model
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            console.log("stop");
            if (state.cameraStarted === true) {
                handTrack.stopVideo(handtrackInput);
                model.dispose();
                state.status = "Model disposed, press Start to reload it";
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
        handTrack.startVideo(handtrackInput).then(function (status: any) {
            state.status = `video started, ${status}`;
            if (status) {
                state.status = "Video started, loading model...";
                // Load the model then send it to detection animation frame
                handTrack
                    .load(modelParams)
                    .then((lmodel: { dispose: () => void; model: boolean; }) => {
                        model = lmodel;
                        state.status = "Model loaded, running detection...";
                        model.model = true;
                        return model;
                    })
                    .then((model: { detect: (arg0: HTMLVideoElement) => Promise<{ label: string; bbox: any[] }[]>; location: number[]; }) => {
                        function runDetection() {
                            if (handtrackInput) {
                                // handtrackInput.addEventListener("loadeddata", () => {
                                // console.log('videodata loaded!');
                                model.detect(handtrackInput as HTMLVideoElement).then((predictions) => {
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
                                            one.bbox.forEach((num: any) => {
                                                if (
                                                    !state.gameReady &&
                                                    !state.gameStarted &&
                                                    state.cameraStarted === true &&
                                                    num
                                                ) {
                                                    state.gameReady = true;
                                                }
                                            });
                                            state.status = `${one.label}`;
                                            model.location[0] = parseInt(one.bbox[0]);
                                            model.location[1] = parseInt(one.bbox[1]);
                                            // model.location.w = parseInt(one.bbox[2]);
                                            // model.location.h = parseInt(one.bbox[3]);
                                            state.cameraStarted = true;
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