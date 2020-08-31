import { Trait } from "../common/models/models";
import { ActionProps } from "./store";
import mapArrayToObject from "../common/functions/mapArrayToObject";

export const ADD_TRAITS = 'ADD_TRAITS';
export const RESET_TRAITS = 'RESET_TRAITS';
export const DELETE_TRAITS = 'DELETE_PRPOFICIENCIES';
export const HANDLE_DRACONIC = 'HANDLE_DRACONIC';

export function addTraits(payload: Array<Trait>) {
    return {
        type: ADD_TRAITS,
        payload: payload
    }
}

export function resetTraits() {
    return {
        type: RESET_TRAITS
    }
}

export function deleteTraits(payload: Array<string>) {
    return {
        type: DELETE_TRAITS,
        payload: payload
    }
}

export function handleDraconic(payload: string) {
    return {
        type: HANDLE_DRACONIC,
        payload: payload
    }
}

const initialState: { [index: string]: Trait } = {};

export default function traitssReducer(state = initialState, action: ActionProps) {
    switch (action.type) {
        case ADD_TRAITS:
            var newState = { ...state };
            const incomingData = mapArrayToObject(action.payload)

            newState = {
                ...state,
                ...incomingData
            }

            return {
                ...newState
            }

        case DELETE_TRAITS:
            var newState = { ...state }

            for (let i = 0; i < action.payload.length; i++) {
                delete newState[action.payload[i]]
            }

        case RESET_TRAITS:
            return initialState

        case HANDLE_DRACONIC:
            var newState = { ...state }
            newState = {
                ...newState,
                ['breath-weapon']: {
                    ...newState['breath-weapon'],
                    name: action.payload
                }
            }
            return newState

        default:
            return state
    }
}