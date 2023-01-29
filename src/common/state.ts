import { proxy } from "valtio";

export const state = proxy({
    // mobile: window.matchMedia("(max-width: 768px)"),
    selfie: false,
    cameraStarted: false,
    status: "Press space to start",
    fullscreen: false,
    // game
    stage: 0,
});

export const model = proxy<ModelProps>({
    selfie: false,
    loadedCamera: false,
    location: [null, null, null, null],
    model: null,
});