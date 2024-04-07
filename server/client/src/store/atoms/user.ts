import { atom } from 'recoil'

export const isUserLoggedInState = atom({
    key: 'isUserLoggedInState',
    default: false
})