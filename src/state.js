import { proxy } from 'valtio'

export const stat = proxy({
    fullscreen: false,
    //UI
    theme: 'light',
    themeChanged: false,
    light: {
        gradient: 'linear-gradient(18deg, rgba(254, 238, 236, 1) 0%, rgba(279, 179, 114, 1) 100%) !important',
        fontColor: '#302422',
    },
    dark: {
        gradient: 'linear-gradient(18deg, rgba(24, 28, 36, 1) 0%, rgba(79, 79, 114, 1) 100%) !important',
        fontColor: '#bebebe',

    },
    paused: false,
    cam: true,
    //selfie: true is gopro, false is facetime hd
    selfie: false,
    effects: true,
    location: {
        x: null,
        y: null,
        w: null,
        h: null
    },
    load: null,
    model: null,
    // R3F
    mat: null,
})