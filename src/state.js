import { proxy } from 'valtio'

export const stat = proxy({
    start: false,
    paused: false,
    cam: true,
    fullscreen: false,
    //UI
    theme: 'light',
    themeChanged: false,
    transition: `3s`,
    light: {
        gradient: 'linear-gradient(18deg, rgba(254, 238, 236, 1) 0%, rgba(239, 229, 194, 1) 100%) !important',
        fontColor: '#5f2422',
        hover: '#ff7d23',
    },
    dark: {
        gradient: 'linear-gradient(18deg, rgba(24, 28, 36, 1) 0%, rgba(79, 79, 114, 1) 100%) !important',
        fontColor: '#bebebe',
        hover: '#5f2fff',

    },
    //selfie: true is external, false is laptop
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
    vrm: false,
})