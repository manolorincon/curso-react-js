import configureStore from 'redux-mock-store' //ES6 modules
import thunk from "redux-thunk";


import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares); // => funcion que permite crear un store

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de auth', () => {

    beforeEach( () => {
        store = mockStore(initState);
    });
    
    test('login y logout deben crear las opciones requeridas', async () => {
    
        const uid = 'TESTING';
        const displayName = 'Manuel';
        
        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect( logoutAction ).toEqual({
            type: types.logout
        });
        
    })

    test('debe realizar el logout', async () => {
        
        await store.dispatch( startLogout() )
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.logout
        })

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        })

    })


    test('Debe de iniciar el startLoginEmailPassword', async () => {

        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );
        const actions = store.getActions();
        
        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                displayName: null,
                uid: 'shUYS6zJxjO17gnCiy5bhLXsWCd2'
            }
        })

    })
    
    

})
