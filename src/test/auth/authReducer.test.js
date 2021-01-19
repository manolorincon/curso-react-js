import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {

    const user = {
        logged: false
    }

    test('Debe retornar el estado por defecto', () => {

        const state = authReducer(user, {});
        expect(state).toBe(user);

    })

    test('Debe de autenticar y colocar el name del usuario', () => {

        const login = authReducer(user, {
            type: types.login,
            payload: {
                name: 'Poncho'
            }
        })

        expect(login.logged).toBe(true);
        expect(login.name).toBe('Poncho')
        
    })

    test('Debe de borrar el name del usuario y logged en false', () => {

        const login = authReducer(user, {
            type: types.logout,
            payload: {
            }
        })

        expect(login.logged).toBe(false);
        expect(login.name).toBe(undefined)
          
    })

})
