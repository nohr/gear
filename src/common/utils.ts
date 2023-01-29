import { model, state } from "./state";

export function start() {
    state.cameraStarted = true;
    state.stage = 1;
    // select();
}

export function stop() {
    state.cameraStarted = false;
    state.status = 'Press space to resume.';
    // clear axis
    for (const axis in model.location) {
        if (model.location[axis]) {
            model.location[axis] = null;
        }
    }
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
    console.log(state.cameraStarted);
    // select();
}