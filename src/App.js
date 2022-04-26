import './App.css';
import React, { Suspense, useRef } from 'react';
import Webcam from 'react-webcam';
import { stat } from './state';
import { useSnapshot } from 'valtio';
import UI from './UI';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
// R3F & Threejs Imports
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { KernelSize } from 'postprocessing'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Quaternion, Euler, Vector3, MeshStandardMaterial } from 'three';
// VRM Imports
import { VRMUtils, VRMSchema, VRM } from '@pixiv/three-vrm';
import * as Kalidokit from 'kalidokit'
// Computer Vision Imports
import {
  Holistic,
  VERSION
} from '@mediapipe/holistic'
import { Camera } from '@mediapipe/camera_utils'
import * as handTrack from 'handtrackjs';

/* THREEJS WORLD SETUP */
let currentVrm;
let videoElement;
let videoElement2;

const onResults = (results) => {
  // Animate model if there is video
  if (currentVrm) {
    animateVRM(currentVrm, results);
  }
}

// Animate Rotation Helper function
const rigRotation = (
  name,
  rotation = { x: 0, y: 0, z: 0 },
  dampener = 1,
  lerpAmount = 0.3
) => {
  if (!currentVrm) { return }
  const Part = currentVrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName[name]);

  if (!Part) { return }

  let euler = new Euler(
    rotation.x * dampener,
    rotation.y * dampener,
    rotation.z * dampener
  );
  let quaternion = new Quaternion().setFromEuler(euler);
  Part.quaternion.slerp(quaternion, lerpAmount); // interpolate
};

// Animate Position Helper Function
const rigPosition = (
  name,
  position = { x: 0, y: 0, z: 0 },
  dampener = 1,
  lerpAmount = 0.3
) => {
  if (!currentVrm) { return }
  const Part = currentVrm.humanoid.getBoneNode(
    VRMSchema.HumanoidBoneName[name]
  );
  if (!Part) { return }
  let vector = new Vector3(
    position.x * dampener,
    position.y * dampener,
    position.z * dampener
  );
  Part.position.lerp(vector, lerpAmount); // interpolate
};

/* VRM Character Animator */
const animateVRM = (vrm, results) => {
  if (!vrm) {
    return;
  }
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
  material.color.setHSL(0, 1, 0.5);  // red
  material.flatShading = true;
  const material1 = new MeshStandardMaterial();
  material1.color.setHSL(0, 0, 1);  // white
  material1.flatShading = true;

  gltf.forEach((child) => {
    // if (child.material) {
    //   if (stat.load === 'closed') {
    //     child.material = material;
    //   } else if (stat.load === 'open') {
    //     child.material = material1;
    //   }
    // }
    if (stat.load === 'closed') {
      // child.up.y = 3;
      return
    } else if (stat.load === 'open') {
      // child.position.z = 0;
      console.log(child);
    }
  })

  // Animate Pose
  if (pose2DLandmarks && pose3DLandmarks) {
    riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, {
      runtime: "mediapipe",
      video: videoElement,
    });
    rigRotation("Hips", riggedPose.Hips.rotation, 0.7);
    rigPosition(
      "Hips",
      {
        x: -riggedPose.Hips.position.x, // Reverse direction
        y: riggedPose.Hips.position.y + 1, // Add a bit of height
        z: -riggedPose.Hips.position.z // Reverse direction
      },
      1,
      0.07
    );

    rigRotation("Chest", riggedPose.Spine, 0.25, .3);
    rigRotation("Spine", riggedPose.Spine, 0.45, .3);

    rigRotation("RightUpperArm", riggedPose.RightUpperArm, 1, .3);
    rigRotation("RightLowerArm", riggedPose.RightLowerArm, 1, .3);
    rigRotation("LeftUpperArm", riggedPose.LeftUpperArm, 1, .3);
    rigRotation("LeftLowerArm", riggedPose.LeftLowerArm, 1, .3);

    rigRotation("LeftUpperLeg", riggedPose.LeftUpperLeg, 1, .3);
    rigRotation("LeftLowerLeg", riggedPose.LeftLowerLeg, 1, .3);
    rigRotation("RightUpperLeg", riggedPose.RightUpperLeg, 1, .3);
    rigRotation("RightLowerLeg", riggedPose.RightLowerLeg, 1, .3);
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

const activateDraw = (ref) => {
  videoElement = document.querySelector(".input_video");
  videoElement2 = document.querySelector(".input_video2");
  /* SETUP MEDIAPIPE HOLISTIC */
  const holistic = new Holistic({
    locateFile: file => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@${VERSION}/${file}`;
    }
  });

  holistic.setOptions({
    selfieMode: stat.selfie,
    modelComplexity: 1,
    smoothLandmarks: false,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
    refineFaceLandmarks: true,
  });

  // Pass holistic a callback function
  holistic.onResults(onResults);

  // Use `Mediapipe` utils to get camera - lower resolution = higher fps
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await holistic.send({ image: videoElement });
    },
    width: 640,
    height: 480
  });

  camera.start()
  // stat.paused ? camera.stop() : camera.start();


  /* SETUP HANDTRACK.JS */
  let model;
  const defaultParams = {
    flipHorizontal: false,
    outputStride: 16,
    imageScaleFactor: 1,
    maxNumBoxes: 20,
    iouThreshold: 0.2,
    scoreThreshold: 0.6,
    modelType: "ssd320fpnlite",
    modelSize: "large",
    bboxLineWidth: "2",
    fontSize: 17,
  };

  const modelParams = {
    flipHorizontal: true, // flip e.g for video
    maxNumBoxes: 3, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.7, // confidence threshold for predictions.
  };

  handTrack.startVideo(videoElement2).then(function (status) {
    stat.load = `video started, ${status}`
    if (status) {
      stat.load = "Video started, now tracking";
      // Load the model then send it to detection animation frame
      handTrack.load(modelParams).then((lmodel) => {
        stat.load = "Model loaded";
        model = lmodel;
        return model;
      }).then((model) => {
        function runDetection() {
          if (videoElement2) {
            model.detect(videoElement2).then((predictions) => {
              predictions.forEach((one) => {
                let xCord = parseInt(one.bbox[0]);
                if (stat.selfie && xCord <= 320 || !stat.selfie && xCord >= 320) {
                  if (one.label === 'open' || one.label === 'closed' || one.label === 'point') {
                    stat.load = `${one.label}`;
                    stat.location.x = parseInt(one.bbox[0]);
                    stat.location.y = parseInt(one.bbox[1]);
                    stat.location.w = parseInt(one.bbox[2]);
                    stat.location.h = parseInt(one.bbox[3]);
                  }
                }
              });
              requestAnimationFrame(runDetection);
            })
          }
        }
        runDetection()
      })
    } else {
      stat.load = "Please enable video";
    }
  });
}

// Arm
function Arm() {
  const scene = useThree().scene;
  const clock = useThree().clock;
  const { current: loader } = useRef(new GLTFLoader());

  //Load vrm
  loader.load('/models/arm.vrm', async gltf => {
    if (currentVrm) {
      return;
    }
    VRMUtils.removeUnnecessaryJoints(gltf.scene);
    const vrm = await VRM.from(gltf);
    scene.add(vrm.scene);
    vrm.scene.rotation.y = Math.PI;
    currentVrm = vrm;
  },
    progress => {
      if (stat.load === `100%`) {
        stat.load = 'Arm loaded'
      } else {
        stat.load = `${parseInt(100.0 * (progress.loaded / progress.total))}%`;
      }
    },
    error => console.error(error))

  useFrame(({ gl, scene, camera }) => {
    // Update model to render physics
    if (currentVrm) {
      currentVrm.update(clock.getDelta());
    }
    gl.render(scene, camera)
  }, 1);
}

// React Three Fiber Canvas
function CanvasComp() {

  return (
    <Canvas
      linear
      className='threeCanvas'
      frameloop='always'
    >
      <PerspectiveCamera
        makeDefault
        fov={60}
        position={[0.25, 1.5, 1.25]}
      />
      <Suspense fallback={null}>
        <spotLight intensity={0.7} position={[0, 3, 7]} />
        <Arm />
        {stat.effects && <EffectComposer multisampling={2}>
          <Bloom kernelSize={1} luminanceThreshold={0} luminanceSmoothing={0.3} intensity={0.8} />
          <Bloom kernelSize={KernelSize.HUGE} luminanceThreshold={0} luminanceSmoothing={1} intensity={1} />
        </EffectComposer>}
      </Suspense>
      <Environment
        path='/'
        files={"studio_small_04_2k.hdr"}
        resolution={256}
      />
    </Canvas>
  )
}

const GlobalStyle = createGlobalStyle`
html, body{
  background: ${props => props.theme.gradient};
}

a, body{
  color: ${props => props.theme.fontColor};
}
`
// App: Top Level Function
export default function App() {
  const snap = useSnapshot(stat);

  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !stat.themeChanged ?
    (stat.theme = 'dark') : (stat.theme = 'light')
  return (
    <ThemeProvider theme={snap.theme === 'light' ? snap.light : snap.dark}>
      <GlobalStyle />
      <div className="App">
        <UI />
        {snap.cam &&
          <>
            <Webcam
              width={640}
              height={480}
              className="input_video selfie"
            />
            <Webcam
              width={640}
              height={480}
              className="input_video2 selfie"
            />
            <canvas
              className="guides"
              ref={(e) => activateDraw(e)}
            ></canvas>
          </>
        }
        <CanvasComp />
      </div>
    </ThemeProvider>
  );
}