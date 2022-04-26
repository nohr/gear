import { proxy } from 'valtio'

export const stat = proxy({
    cam: true,
    selfie: true,
    effects: true,
    location: {
        x: null,
        y: null,
        w: null,
        h: null
    },
    load: null,
    hand: null,
    model: null,
})