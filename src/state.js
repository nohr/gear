import { proxy } from 'valtio'

export const state = proxy({
    // Game
    triggered: 0,
    start: false,
    started: false,
    ready: false,
    paused: false,
    cam: true,
    stage: 0,
    // ML Models
    selfie: false,
    loadedCamera: false,
    location: {
        x: null,
        y: null,
        w: null,
        h: null
    },
    load: 'Press Start',
    model: null,
    // R3F
    mat: null,
    effects: true,
    vrm: false,
    //UI
    mobile: false,
    caption: false,
    fullscreen: false,
    popup: false,
    theme: 'light',
    themeChanged: false,
    transition: `0.3s`,
    light: {
        gradient: 'linear-gradient(0deg, #ebebeb 0%, #D8E3EE 100%) !important',
        base: '#006EBC',
        baseAlpha: `#006EBC67`,
        sub: '#FE3632',
        subAlpha: '#FE363247',
        third: '#1A090D',
        thirdAlpha: '#1A090D67',
    },
    dark: {
        gradient: 'linear-gradient(0deg, rgba(24, 28, 36, 1) 0%, rgba(79, 79, 114, 1) 100%) !important',
        base: '#bebebe',
        baseAlpha: `#bebebe47`,
        sub: '#CCFF66',
        subAlpha: '#CCFF6667',
        third: '#1E7D94',
        thirdAlpha: '#1E7D9467',
    },
})