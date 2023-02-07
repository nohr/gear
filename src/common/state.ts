import { proxy } from "valtio";

export const state = proxy({
    // mobile: window.matchMedia("(max-width: 768px)"),
    selfie: false,
    cameraStarted: false,
    status: "Press space to start",
    fullscreen: false,
    // game
    playing: false,
    gameStarted: false,
    gameReady: false,
    stage: 0,
    // canvas
    vrmLoaded: false,
});

export const model = proxy<ModelProps>({
    selfie: false,
    loadedCamera: false,
    location: [null, null, null, null],
    model: null,
});