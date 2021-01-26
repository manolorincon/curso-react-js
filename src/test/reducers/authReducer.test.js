import { authReducer } from "../../reducer/authReducer"
import { types } from "../../types/types";


describe('Pruebas en el authReducer', () => {
    
    test('Debe realizar el login', () => {
        
        const initialState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Fernando'
            }
        };

        const state = authReducer(initialState, action);
        expect(state).toEqual({
            uid: 'abc',
            name: 'Fernando'
        })
    });


    test('Debe realizar el logout', () => {
        
        const initialState = {
            uid: 'aiojf3oqoo3f',
            name: 'Fernando'
        };
        const action = {
            type: types.logout
        };

        const state = authReducer(initialState, action);
        expect(state).toEqual({});
    })
    

    test('Debe retornar el initialState si no reconoce el tipo de acción', () => {
        
        const initialState = {};
        const action = {
            type: types.diomedes
        };

        const state = authReducer(initialState, action);
        expect(state).toEqual(initialState);
    })

})
