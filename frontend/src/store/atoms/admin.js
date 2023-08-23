import { atom } from 'recoil'

export const currUserState = atom({
    key: 'currUserState',
    default: ''
})

export const signupState = atom({
    key: 'signupState',
    default: true
})

export const loginState = atom({
    key: 'loginState',
    default: false
})

export const signupDetailsState = atom({
    key: 'signupDetailsState',
    default: {
        signupEmailState: '',
        signupPasswordState: ''
    }
})

export const loginDetailsState = atom({
    key: 'loginEmailState',
    default: {
        loginEmailState: '',
        loginPasswordState: ''
    }
})