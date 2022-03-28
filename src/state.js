import { proxy } from 'valtio'

export const state = proxy({
    loading: false,
})