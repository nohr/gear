import { state } from "./state";
import {
    drawConnectors,
    drawLandmarks
} from "@mediapipe/drawing_utils";

// Mediapipe declarations
const mpHolistic = window;
const drawingUtils = window;
// const fpsControl = new controls.FPS();

// Landmark 
function removeElements(landmarks, elements) {
    for (const element of elements) {
        delete landmarks[element];
    }
}
function removeLandmarks(results) {
    if (results.poseLandmarks) {
        removeElements(results.poseLandmarks, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 17, 18, 19, 20, 21, 22]);
    }
}
function connect(ctx, connectors) {
    const canvas = ctx.canvas;
    for (const connector of connectors) {
        const from = connector[0];
        const to = connector[1];
        if (from && to) {
            if (from.visibility && to.visibility &&
                (from.visibility < 0.1 || to.visibility < 0.1)) {
                continue;
            }
            ctx.beginPath();
            ctx.moveTo(from.x * canvas.width, from.y * canvas.height);
            ctx.lineTo(to.x * canvas.width, to.y * canvas.height);
            ctx.stroke();
        }
    }
}

function stopLoading() {
    state.loading = false;
}

// <---------- MediPipe Holistic onResults Function ---------->
let activeEffect = 'mask';
export const makeLandmarks = (canvasElement, canvasCtx) => (results) => {
    // Remove landmarks we don't want to draw.
    removeLandmarks(results);
    // Update the frame rate. - UNCAUGHT control_utils ERROR
    // fpsControl.tick();

    // Draw the overlays.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    if (results.segmentationMask) {
        canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);
        // Only overwrite existing pixels.
        if (activeEffect === 'mask' || activeEffect === 'both') {
            canvasCtx.globalCompositeOperation = 'source-in';
            // This can be a color or a texture or whatever...
            // canvasCtx.leftHandLandmarks
            canvasCtx.fillStyle = '#00FF007F';
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
        }
        else {
            canvasCtx.globalCompositeOperation = 'source-out';
            canvasCtx.fillStyle = '#0000FF7F';
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
        }
        // Only overwrite missing pixels.
        canvasCtx.globalCompositeOperation = 'destination-atop';
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.globalCompositeOperation = 'source-over';
    }
    else {
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    }
    // Connect elbows to hands. Do this first so that the other graphics will draw
    // on top of these marks.
    canvasCtx.lineWidth = 5;
    if (results.poseLandmarks) {
        if (results.rightHandLandmarks) {
            canvasCtx.strokeStyle = 'white';
            connect(canvasCtx, [[
                results.poseLandmarks[mpHolistic.POSE_LANDMARKS.RIGHT_ELBOW],
                results.rightHandLandmarks[0]
            ]]);
        }
        if (results.leftHandLandmarks) {
            canvasCtx.strokeStyle = 'white';
            connect(canvasCtx, [[
                results.poseLandmarks[mpHolistic.POSE_LANDMARKS.LEFT_ELBOW],
                results.leftHandLandmarks[0]
            ]]);
        }
    }
    // Pose...
    if (results.poseLandmarks) {
        drawConnectors(canvasCtx, results.poseLandmarks, mpHolistic.POSE_CONNECTIONS, { color: 'white' });
        drawLandmarks(canvasCtx, Object.values(mpHolistic.POSE_LANDMARKS_LEFT).map(index => results.poseLandmarks[index]), { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)' });
        drawLandmarks(canvasCtx, Object.values(mpHolistic.POSE_LANDMARKS_RIGHT).map(index => results.poseLandmarks[index]), { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)' });
    }
    // Hands...
    if (results.rightHandLandmarks) {
        drawConnectors(canvasCtx, results.rightHandLandmarks, mpHolistic.HAND_CONNECTIONS, { color: 'white' });
        drawLandmarks(canvasCtx, results.rightHandLandmarks, {
            color: 'white',
            fillColor: 'rgb(210,127,231)',
            lineWidth: 1,
            radius: (data) => {
                return drawingUtils.lerp(data.from.z, -0.15, .1, 10, 1);
            }
        });
    }
    if (results.leftHandLandmarks) {
        drawConnectors(canvasCtx, results.leftHandLandmarks, mpHolistic.HAND_CONNECTIONS, { color: 'white' });
        drawLandmarks(canvasCtx, results.leftHandLandmarks, {
            color: 'white',
            fillColor: 'rgb(150,238,130)',
            lineWidth: 1,
            radius: (data) => {
                return drawingUtils.lerp(data.from.z, -0.15, .1, 10, 1);
            }
        });
    }
}