import { VRM, VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { model, state } from "./state";

export function start() {
    state.cameraStarted = true;
    state.playing = true;
    state.stage = 1;
    // select();
}

export function stop() {
    state.cameraStarted = false;
    state.playing = false;
    state.status = 'Press space to resume.';
    // clear axis
    for (const axis in model.location) {
        if (model.location[axis]) {
            model.location[axis] = null;
        }
    }
    // select();
}

export function resume() {
    state.playing = true;
    state.status = 'Press space to pause.';
}

export function pause() {
    state.playing = false;
    state.status = 'Press space to resume.';
}

export function togglePlay() {
    state.playing ? pause() : resume();
    // select();
}

export function toggleCamera() {

    state.selfie = !state.selfie;
    // state.cameraStarted ? stop() : null;
    // console.log(state.cameraStarted);
    // select();
}

export function toggleFullscreen() {
    console.log(state.fullscreen);

    function openFullscreen() {
        const elem = document.documentElement;
        state.fullscreen = true;
        // select();
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        // else if (elem.webkitRequestFullscreen) { /* Safari */
        //     elem.webkitRequestFullscreen();
        // } else if (elem.msRequestFullscreen) { /* IE11 */
        //     elem.msRequestFullscreen();
        // }
    }
    function closeFullscreen() {
        state.fullscreen = false;
        // select();
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        // else if (document.webkitExitFullscreen) { /* Safari */
        //     document.webkitExitFullscreen();
        // } else if (document.msExitFullscreen) { /* IE11 */
        //     document.msExitFullscreen();
        // }
    }
    state.fullscreen ? closeFullscreen() : openFullscreen();
    // select();
}

export function toggleStart() {

    state.cameraStarted ? stop() : start();
    // select();
}

// FIXME: Decode the base64 string and load from cache
export async function loadVRMFromLocalStorage() {
    let vrm: VRM;
    // let localVrm: string | null = localStorage.getItem('vrm');
    // if (vrm) {
    //     vrm = JSON.parse(vrm);
    //     const blob = new Blob([vrm], { type: 'application/octet-stream' });
    //     const file = new File([blob], 'vrm', { type: 'application/octet-stream' });
    //     const url = URL.createObjectURL(file);
    //     const response = await fetch(url);
    //     const buffer = await response.arrayBuffer();
    //     const vrmBuffer = new Uint8Array(buffer);
    //     return vrmBuffer;
    // }
    // return vrm as VRMResult;
    return null;
}

// FIXME: VRM is too large to set to local storage
export async function loadVRMFromHosting(current: VRM, url: string) {
    // const res = await fetch(url);
    // const blobVrm = await res.blob();
    (async () => {

    })()

}

export const loadVRM = async (vrm: { current: VRM | null }) => {
    try {
        // Check Local Storage for a VRM
        const localVrm: VRM | null = await loadVRMFromLocalStorage();
        if (localVrm !== null) {
            vrm.current = localVrm;
        } else {
            // Load a VRM from hosting
            const loader = new GLTFLoader();
            loader.register((parser) => {
                return new VRMLoaderPlugin(parser);
            });
            // load VRM
            loader.load(
                "/models/fullbody_20230204.vrm",
                async (gltf) => {
                    VRMUtils.removeUnnecessaryJoints(gltf.scene);
                    vrm.current = (await gltf.userData.vrm) as VRM;
                    vrm.current.scene.rotation.y = Math.PI;
                    vrm.current.scene.position.y = -1.35;
                    state.vrmLoaded = true;
                    // FIXME: reduce vrm size and cache it
                    // TODO: Allow vrm changes based on level and/or user input to caache
                    // convert to base64 and save to local storage
                    // let reader = new FileReader();
                    // reader.readAsDataURL(blobVrm);
                    // reader.onload = function () {
                    //     localStorage.setItem("vrm", JSON.stringify(reader.result));
                    // };
                    // reader.onerror = function (error) {
                    //     console.log('Error: ', error);
                    // };
                },
                (progress) => {
                    state.status =
                        100.0 * (progress.loaded / progress.total) === 100.0
                            ? "100% armed"
                            : progress.loaded / progress.total <= 1.0
                                ? `${Math.floor(
                                    100.0 * (progress.loaded / progress.total)
                                )}% armed...`
                                : "Overloaded! Now resolving...";
                },
                (error) => console.error(error)
            );
        }
    } catch (e) {
        console.error(e);
    }
};