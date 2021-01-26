import { types } from "../../types/types"

describe('Pruebas en el types.js', () => {

    const objtypes = {

        login: '[auth] login',
        logout: '[auth] logout',
    
        uiSetError: '[UI] Set Error',
        uiRemoveError: '[UI] Remove Error',
    
        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',
    
        notesAddNew: '[Notes] New note',
        notesActive: '[Notes] Set active note',
        notesLoad: '[Notes] Load note',
        notesUpdated: '[Notes] Updated note',
        notesFileUrl: '[Notes] Updated image url',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout Cleaning'
    
    }

    test('Debe ser igual al types', () => {

        expect(objtypes).toEqual(types);

    })
    
})
