import {
  VRM,
  VRMHumanBoneName,
  VRMLoaderPlugin,
  VRMUtils,
} from "@pixiv/three-vrm";
import {
  Pose,
  type TPose,
  Hand,
  type THand,
  Side,
  Face,
  TFace,
} from "kalidokit";
import {
  Euler,
  Event,
  MeshStandardMaterial,
  Object3D,
  Quaternion,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { create } from "zustand";

interface SceneProps {
  vrm: VRM | null;
  animate: (
    delta: number,
    vrm: VRM,
    input: HTMLVideoElement,
    results: Results
  ) => void;
  affect: (ailment: string, vrm: VRM) => void;
  load: (setStatus: UIProps["setStatus"], helperRoot?: Object3D<Event>) => void;
}
export const useSceneStore = create<SceneProps>()((set) => ({
  vrm: null,
  animate: (delta, vrm, input, results) => {
    // ? helper functions for rigging face & rotation of bones
    function rigRotation({
      name,
      rotation,
      dampener = 1,
      lerpAmount = 0.3,
    }: {
      name: VRMHumanBoneName;
      rotation: { x: number; y: number; z: number };
      dampener?: number;
      lerpAmount?: number;
    }): void {
      // if (name !== "rightUpperArm") return;
      const Part = vrm.humanoid.getRawBoneNode(name);
      if (!Part) return;
      const euler = new Euler(
        rotation.x * dampener,
        rotation.y * dampener,
        rotation.z * dampener
      );
      const quaternion = new Quaternion().setFromEuler(euler);
      Part.quaternion.slerp(quaternion, lerpAmount);
      vrm.update(delta);
    }
    // * get the landmarks from the results
    const {
      // za: lm3d,
      poseLandmarks: lm2d,
      faceLandmarks,
      rightHandLandmarks: leftHandLandmarks,
      leftHandLandmarks: rightHandLandmarks,
    } = results;

    // console.log(results.rightHandLandmarks);

    // * if we have landmarks, solve the neck and pose
    if (faceLandmarks) {
      const riggedFace = Face.solve(faceLandmarks, {
        runtime: "mediapipe",
        video: input as HTMLVideoElement,
      }) as TFace;
      rigRotation({ name: "neck", rotation: riggedFace.head, dampener: 0.7 });
    }
    if (lm2d && results.za) {
      const {
        Spine,
        RightUpperArm,
        RightLowerArm,
        RightHand,
        LeftUpperArm,
        LeftLowerArm,
        LeftHand,
      } = Pose.solve(results?.za, lm2d, {
        runtime: "mediapipe",
        video: input as HTMLVideoElement,
        enableLegs: false,
      }) as TPose;

      rigRotation({
        name: "chest",
        rotation: Spine,
        dampener: 0.25,
        lerpAmount: 0.3,
      });
      rigRotation({
        name: "spine",
        rotation: Spine,
        dampener: 0.45,
        lerpAmount: 0.3,
      });
      rigRotation({
        name: "rightUpperArm",
        rotation: RightUpperArm,
        dampener: 1,
        lerpAmount: 0.3,
      });
      rigRotation({
        name: "rightLowerArm",
        rotation: RightLowerArm,
        dampener: 1,
        lerpAmount: 0.3,
      });
      rigRotation({
        name: "leftUpperArm",
        rotation: LeftUpperArm,
        dampener: 1,
        lerpAmount: 0.3,
      });
      rigRotation({
        name: "leftLowerArm",
        rotation: LeftLowerArm,
        dampener: 1,
        lerpAmount: 0.3,
      });
      if (leftHandLandmarks) {
        const {
          LeftWrist,
          LeftRingProximal,
          LeftRingIntermediate,
          LeftRingDistal,
          LeftIndexProximal,
          LeftIndexIntermediate,
          LeftIndexDistal,
          LeftMiddleProximal,
          LeftMiddleIntermediate,
          LeftMiddleDistal,
          LeftThumbProximal,
          LeftThumbIntermediate,
          LeftThumbDistal,
          LeftLittleProximal,
          LeftLittleIntermediate,
          LeftLittleDistal,
        } = Hand.solve(leftHandLandmarks, "Left") as THand<Side>;
        rigRotation({
          name: "leftHand",
          rotation: {
            z: LeftHand.z as number,
            y: LeftWrist.y,
            x: LeftWrist.x,
          },
        });
        rigRotation({ name: "leftRingProximal", rotation: LeftRingProximal });
        rigRotation({
          name: "leftRingIntermediate",
          rotation: LeftRingIntermediate,
        });
        rigRotation({ name: "leftRingDistal", rotation: LeftRingDistal });
        rigRotation({
          name: "leftIndexProximal",
          rotation: LeftIndexProximal,
        });
        rigRotation({
          name: "leftIndexIntermediate",
          rotation: LeftIndexIntermediate,
        });
        rigRotation({ name: "leftIndexDistal", rotation: LeftIndexDistal });
        rigRotation({
          name: "leftMiddleProximal",
          rotation: LeftMiddleProximal,
        });
        rigRotation({
          name: "leftMiddleIntermediate",
          rotation: LeftMiddleIntermediate,
        });
        rigRotation({ name: "leftMiddleDistal", rotation: LeftMiddleDistal });
        rigRotation({
          name: "leftThumbProximal",
          rotation: LeftThumbProximal,
        });
        rigRotation({
          name: "leftThumbMetacarpal",
          rotation: LeftThumbIntermediate,
        });
        rigRotation({ name: "leftThumbDistal", rotation: LeftThumbDistal });
        rigRotation({
          name: "leftLittleProximal",
          rotation: LeftLittleProximal,
        });
        rigRotation({
          name: "leftLittleIntermediate",
          rotation: LeftLittleIntermediate,
        });
        rigRotation({ name: "leftLittleDistal", rotation: LeftLittleDistal });
      }
      if (rightHandLandmarks) {
        const {
          RightWrist,
          RightRingProximal,
          RightRingIntermediate,
          RightRingDistal,
          RightIndexProximal,
          RightIndexIntermediate,
          RightIndexDistal,
          RightMiddleProximal,
          RightMiddleIntermediate,
          RightMiddleDistal,
          RightThumbProximal,
          RightThumbIntermediate,
          RightThumbDistal,
          RightLittleProximal,
          RightLittleIntermediate,
          RightLittleDistal,
        } = Hand.solve(rightHandLandmarks, "Right") as THand<Side>;

        rigRotation({
          name: "rightHand",
          rotation: {
            z: RightHand.z as number,
            y: RightWrist.y,
            x: RightWrist.x,
          },
        });
        rigRotation({
          name: "rightRingProximal",
          rotation: RightRingProximal,
        });
        rigRotation({
          name: "rightRingIntermediate",
          rotation: RightRingIntermediate,
        });
        rigRotation({ name: "rightRingDistal", rotation: RightRingDistal });
        rigRotation({
          name: "rightIndexProximal",
          rotation: RightIndexProximal,
        });
        rigRotation({
          name: "rightIndexIntermediate",
          rotation: RightIndexIntermediate,
        });
        rigRotation({ name: "rightIndexDistal", rotation: RightIndexDistal });
        rigRotation({
          name: "rightMiddleProximal",
          rotation: RightMiddleProximal,
        });
        rigRotation({
          name: "rightMiddleIntermediate",
          rotation: RightMiddleIntermediate,
        });
        rigRotation({
          name: "rightMiddleDistal",
          rotation: RightMiddleDistal,
        });
        rigRotation({
          name: "rightThumbProximal",
          rotation: RightThumbProximal,
        });
        rigRotation({
          name: "rightThumbMetacarpal",
          rotation: RightThumbIntermediate,
        });
        rigRotation({ name: "rightThumbDistal", rotation: RightThumbDistal });
        rigRotation({
          name: "rightLittleProximal",
          rotation: RightLittleProximal,
        });
        rigRotation({
          name: "rightLittleIntermediate",
          rotation: RightLittleIntermediate,
        });
        rigRotation({
          name: "rightLittleDistal",
          rotation: RightLittleDistal,
        });
      }
    }
  },
  affect(status, vrm) {
    const material = new MeshStandardMaterial();
    material.color.setHSL(0.5, 1, 0.5); // red
    material.flatShading = true;
    const material1 = new MeshStandardMaterial();
    material1.color.setHSL(0, 0, 1); // white
    material1.flatShading = true;
    const material2 = new MeshStandardMaterial();
    material2.color.setHSL(1.92, 0.66, 0.35); // white
    material2.flatShading = true;

    if (!vrm) return;
    const gltf = vrm.scene.children;
    gltf.forEach((child: Object3D<Event>) => {
      console.log(child);

      // if (child.material) {
      //   if (status === "closed") {
      //     // Do something when the hand is closed
      //     child.material = material;
      //     return;
      //   } else if (status === "open") {
      //     // Do something when the hand is open
      //     child.material = material1;
      //     return;
      //   } else if (status === "point") {
      //     // Do something when the hand is pointed
      //     child.material = material2;
      //     return;
      //   }
      // }
    });
  },
  load(setStatus, helperRoot) {
    // Load a VRM from hosting
    const loader = new GLTFLoader();
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser, {
        // helperRoot,
        autoUpdateHumanBones: false,
      });
    });
    // load VRM
    loader.load(
      "/models/fullbody.vrm",
      (gltf) => {
        VRMUtils.removeUnnecessaryJoints(gltf.scene);
        const localvrm = gltf.userData.vrm as VRM;
        localvrm.scene.traverse((part) => (part.frustumCulled = false));
        set(() => ({ vrm: localvrm }));
      },
      (progress) => {
        const current =
          100.0 * (progress.loaded / progress.total) === 100.0
            ? "100% armed"
            : progress.loaded / progress.total <= 1.0
            ? `${Math.floor(
                100.0 * (progress.loaded / progress.total)
              )}% armed...`
            : "Overloaded! Now resolving...";
        setStatus(current);
      },
      (error) => console.error(error)
    );
  },
}));
