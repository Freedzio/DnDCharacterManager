import { ActionProps } from "./store";

export const SET_DESCRIPTION = 'SET_DESCRIPTION'
export const RESET_DESRCIPTION = 'RESET_DESCRIPTION'

export function setDescription(payload: string) {
    return {
        type: SET_DESCRIPTION,
        payload: payload
    }
}

export function resetDescription() {
    return {
        type: RESET_DESRCIPTION
    }
}

const initialState = '';

export default function descriptionReducer(state = initialState, action: ActionProps) {
    switch (action.type) {
        case SET_DESCRIPTION:
            return action.payload

        case RESET_DESRCIPTION:
            return initialState;

        default:
            return state
    }
}