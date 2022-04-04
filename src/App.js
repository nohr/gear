import './App.css';
import React from 'react';
import Webcam from 'react-webcam';
import { Holistic } from '@mediapipe/holistic';
import { Camera } from '@mediapipe/camera_utils';
import { state } from './state';
import { useSnapshot } from 'valtio';
import Arm from './arm';
import { makeLandmarks } from './landmarks'


const mpHolistic = window;

export const onResults = (canvasElement, canvasCtx) => (results) => {
  const leftHand = results.leftHandLandmarks;
  const rightHand = results.rightHandLandmarks;

  if (leftHand) {
    console.log(leftHand);
  }
  if (rightHand) {
    console.log(rightHand);
  }
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
  // Draw Landmarks
  holistic.onResults(makeLandmarks(ref, canvasCtx));
  // holistic.onResults(onResults(ref, canvasCtx));

  //Initialize and start MediaPipe camera
  const camera = new Camera(videoElement, {
    onFrame: holisticFrame,
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: "user"
  });

  camera.start();
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

