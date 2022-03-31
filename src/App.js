import './App.css';
import React from 'react';
import Webcam from 'react-webcam';
import {
  drawConnectors,
  drawLandmarks
} from "@mediapipe/drawing_utils";
import { Holistic } from '@mediapipe/holistic';
import { Camera } from '@mediapipe/camera_utils';
import { state } from './state';
import { useSnapshot } from 'valtio';


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

// <---------- MediPipe Holistic onResults Function ---------->
let activeEffect = 'mask';
const onResults = (canvasElement, canvasCtx) => (results) => {
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
  drawConnectors(canvasCtx, results.poseLandmarks, mpHolistic.POSE_CONNECTIONS, { color: 'white' });
  drawLandmarks(canvasCtx, Object.values(mpHolistic.POSE_LANDMARKS_LEFT).map(index => results.poseLandmarks[index]), { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)' });
  drawLandmarks(canvasCtx, Object.values(mpHolistic.POSE_LANDMARKS_RIGHT).map(index => results.poseLandmarks[index]), { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)' });
  // Hands...
  drawConnectors(canvasCtx, results.rightHandLandmarks, mpHolistic.HAND_CONNECTIONS, { color: 'white' });
  drawLandmarks(canvasCtx, results.rightHandLandmarks, {
    color: 'white',
    fillColor: 'rgb(210,127,231)',
    lineWidth: 1,
    radius: (data) => {
      return drawingUtils.lerp(data.from.z, -0.15, .1, 10, 1);
    }
  });
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

let activateDraw = (ref) => {
  const canvasCtx = ref.getContext('2d');
  const videoElement = document.getElementsByClassName('input_video')[0];

  async function holisticFrame() {
    await holistic.send({ image: videoElement });
  }
  // Initialize MediaPipe Holistic
  const holistic = new Holistic({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@` + `${mpHolistic.VERSION}/${file}`;
    }
  });
  holistic.setOptions({
    selfimode: true,
    upperBodyOnly: true,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,

  });

  holistic.onResults(onResults(ref, canvasCtx));

  console.log(holistic);
  //Initialize and start MediaPipe camera
  const camera = new Camera(videoElement, {
    onFrame: holisticFrame,
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: "user"
  });

  camera.start();
  console.log(camera);

}

// App: FINAL OUTPUT
export default function App() {
  const snap = useSnapshot(state);

  return (
    <div className="App">
      <Webcam
        width={100 + '%'}
        className="input_video selfie"
      />
      <div className="canvas-container">
        <canvas
          className="output_canvas"
          ref={(e) => activateDraw(e)}
          width="1920px" height="1080px"
        >
        </canvas>
        {snap.loading ?
          (<div className="loading">
            <div className="spinner"></div>
            <div className="message">
              Loading...
            </div>
          </div>) : null}
      </div>
      <div className='caption'> property of <a href='https://nabla.ooo/'>nabla</a> | follow the development on <a href='https://github.com/nohr/gear-and-loading'>github</a> </div>
    </div>
  );
}

