import atom from 'recoil'

export const signupState= atom({
    key: signupState,
    default: true
})

export const loginState= atom({
    key: loginState,
    default: false
})

export const signupEmailState= atom({
    key: signupEmailState,
    default: ''
})

export const signupPasswordState= atom({
    key: signupEmailState,
    default: ''
})

export const loginEmailState= atom({
    key: signupEmailState,
    default: ''
})

export const loginPasswordlState= atom({
    key: signupEmailState,
    default: ''
})