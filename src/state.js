import { proxy } from 'valtio'

export const stat = proxy({
    // Game Logic
    start: false,
    started: false,
    ready: false,
    paused: false,
    cam: true,
    //UI
    fullscreen: false,
    popup: false,
    theme: 'light',
    themeChanged: false,
    transition: `0.3s`,
    light: {
        gradient: 'linear-gradient(0deg, rgba(234, 258, 236, 1) 0%, rgba(202, 205, 204, 1) 100%) !important',
        base: '#056D58',
        baseAlpha: `#056D5867`,
        sub: '#FE3632',
        subAlpha: '#FE363247',
        third: '#1A090D',
        thirdAlpha: '#1A090D67'
    },
    dark: {
        gradient: 'linear-gradient(0deg, rgba(24, 28, 36, 1) 0%, rgba(79, 79, 114, 1) 100%) !important',
        base: '#bebebe',
        baseAlpha: `#bebebe47`,
        sub: '#4ECDC4',
        subAlpha: '#4ECDC467',
        third: '#CCFF66',
        thirdAlpha: '#CCFF6667'
    },
    // ML Models
    //selfie: true is external, false is laptop
    selfie: false,
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
    effects: true,
    vrm: false,
})