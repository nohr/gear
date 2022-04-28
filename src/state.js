import { proxy } from 'valtio'

export const stat = proxy({
    start: false,
    ready: false,
    paused: false,
    cam: true,
    fullscreen: false,
    popup: false,
    //UI
    theme: 'light',
    themeChanged: false,
    transition: `0.3s`,
    light: {
        gradient: 'linear-gradient(0deg, rgba(234, 258, 236, 1) 0%, rgba(202, 205, 204, 1) 100%) !important',
        baseColor: '#056D58',
        baseColorAlpha: `#056D5867`,
        sub: '#FE3632',
        subAlpha: '#00000047',
    },
    dark: {
        gradient: 'linear-gradient(0deg, rgba(24, 28, 36, 1) 0%, rgba(79, 79, 114, 1) 100%) !important',
        baseColor: '#bebebe',
        baseColorAlpha: `#bebebe47`,
        sub: '#00FFFF',
        subAlpha: '#ffffff67',

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