import { model, state } from "state";
import {
    Holistic,
    VERSION
} from '@mediapipe/holistic'
import { Camera } from '@mediapipe/camera_utils'
// import { animateVRM } from "3D/animateVRM";
import type { VRM } from "@pixiv/three-vrm";

export function handleHolistic(vrm: { current: VRM }, hollisticInput: HTMLVideoElement) {
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
    const onResults = (results: any) => {
        // Animate model if there is video
        if (vrm.current) {
            if (model.model && !model.location[0] && !model.location[1] && state.status !== 'Ready') {
                state.status = 'Ready';
                state.gameReady = true;
            };
            // animateVRM(vrm.current, results, hollisticInput);
        };
    };
    holistic.onResults(onResults);

    // camera.start()
    if (state.cameraStarted) {
        // Use `Mediapipe` utils to get camera - lower resolution = higher fps
        const camera = new Camera(hollisticInput, {
            onFrame: async () => {
                await holistic.send({ image: hollisticInput });
            },
            width: 640,
            height: 480,
        });
        camera.start();
    }
}