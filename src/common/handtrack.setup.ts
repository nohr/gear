import { state } from "state";
// @ts-ignore
// import { stopVideo } from 'handtrackjs';

export function handleHandtrack(e: SyntheticEvent<HTMLVideoElement, Event>) {
    const { target: handtrackInput } = e;

    /* SETUP HANDTRACK.JS */
    let model: { dispose: () => void; model: boolean; };
    let startBtn = document.querySelector(".start");

    // Stop model
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            console.log("stop");
            if (state.cameraStarted === true) {
                // stopVideo(handtrackInput);
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
                                model.detect(handtrackInput).then((predictions) => {
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
}