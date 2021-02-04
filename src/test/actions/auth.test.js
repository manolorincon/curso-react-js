import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import { startChecking, startLogin, startLogout, startRegister } from '../../actions/auth';
import * as fecthModule from '../../helpers/fetch';
import { types } from '../../types/types';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));
const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {}

let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones Auth', () => {
    
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('Startlogin correcto', async () => {

        await store.dispatch(startLogin('mrincon@gmail.com', '123456'));

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: '[auth] Login',
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalled();
        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        //token = localStorage.setItem.mock.calls[0][1];
        //console.log(localStorage.setItem.mock.calls);

    })


    test('Startlogin incorrecto', async () => {

        await store.dispatch(startLogin('mrincon1@gmail.com', '123456'));

        let actions = store.getActions();
        
        expect( actions ).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalled();
        
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Usuario no existe con ese email', 'error');

        await store.dispatch(startLogin('mrincon@gmail.com', '123456789'));

        actions = store.getActions();
        
        expect( actions ).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalled();
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error');

    })

    test('StarRegister correcto', async () => {
        
        fecthModule.fetchSinToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123ABC123'
                }
            }
        }))

        await store.dispatch(startRegister('test@test.com', '123456', 'test'));

        let actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    })

    test('StartChecking correcto', async () => {

        fecthModule.fetchConToken = jest.fn( () => ({
            json(){
                return{
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123ABC123'
                }
            }
        }));

        await store.dispatch( startChecking() );

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', 'ABC123ABC123' );

    })
    
})
