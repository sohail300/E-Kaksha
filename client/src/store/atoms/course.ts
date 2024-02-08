import {atom} from 'recoil'

export const titleState = atom({
    key: 'titleState',
    default: ''
})

export const descriptionState = atom({
    key: 'descriptionState',
    default: ''
})

export const priceState = atom({
    key: 'priceState',
    default: ''
})

export const imageLinkState = atom({
    key: 'imageLinkState',
    default: ''
})

export const giveReview = atom({
    key: 'giveReview',
    default: false
})

export const showContact = atom({
    key: 'showContact',
    default: false
})