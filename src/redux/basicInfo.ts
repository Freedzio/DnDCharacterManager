import { ActionProps } from './store'

export const SET_BASIC_INFO = 'SET_BASIC_INFO';
export const RESET_BASIC_INFO = 'RESET_BASIC_INFO';
export const UPDATE_BASIC_INFO = 'UPDATE_BASIC_INFO';

export function setBasicInfo(payload: BasicInfo) {
    return {
        type: SET_BASIC_INFO,
        payload: payload
    }
}

export function updateBasicInfo(payload: Partial<BasicInfo>) {
    return {
        type: UPDATE_BASIC_INFO,
        payload: payload
    }
}

export function resetBasicInfo() {
    return {
        type: RESET_BASIC_INFO
    }
}

const initalState = {
    speed: 0,
    alignment: '',
    age: 0,
    size: ''
}

export default function basicInfoReducer(state = initalState, action: ActionProps) {
    switch (action.type) {
        case SET_BASIC_INFO:
            return action.payload

        case UPDATE_BASIC_INFO:
            return {
                ...state,
                ...action.payload
            }

        case RESET_BASIC_INFO:
            return initalState

        default:
            return state
    }
}


export interface BasicInfo {
    speed: number,
    alignment: string,
    age: number,
    size: string
}