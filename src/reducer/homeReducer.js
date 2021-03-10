import { types } from '../types/types'

const initialState = {
    diaSemana: '',
    submit: false
}


export const homeReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.startSubmit:
            return {
                ...state,
                submit: true
            }
        case types.finishSubmit:
            return {
                ...state,
                submit: false
            }
        case types.homeDiaSemana:
            console.log('action', action);
            return {
                ...state,
                diaSemana: action.payload.diaSemana
            }
        default:
            return state;
    }
    
}