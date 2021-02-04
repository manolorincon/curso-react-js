import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en el authReducer', () => {
    
    const initState = {
        checking: true
    }

    test('debe de retornar el estado por defecto', () => {

        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Fernando'
            }
        }
        const state = authReducer( initState,  action);

        expect(state).toEqual({
            checking: false,
            name: 'Fernando',
            uid: '123'
        });

    })


    test('debe de retornar el login', () => {

        const state = authReducer( initState, {} );

        expect(state).toEqual(initState);

    })
    

})
