import {b} from '../atoms/user'
import {seletor} from 'recoil'

export const a=selector({
    key: 'a',
    get: ({get}) => {
        const state=get(b);
        return state.c;
    }
})