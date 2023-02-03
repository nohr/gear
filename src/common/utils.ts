import type { VRM } from "@pixiv/three-vrm";
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
    state.cameraStarted ? stop() : null;
    console.log(state.cameraStarted);
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

export async function loadVRMFromLocalStorage() {
    let vrm: VRM | null = null;
    // FIXME: Begin the process of decoding the base64 string
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
    // return vrm as VRM | null;
    return vrm;
}

export async function loadVRMFromHosting(current: VRM | null, url: string) {

    // FIXME: VRM is too large to set to local storage
    // const res = await fetch(url);
    // const blobVrm = await res.blob();
    (async () => {

    })()

}