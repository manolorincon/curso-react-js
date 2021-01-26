import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares); // => funcion que permite crear un store

const initState = {
    auth: {
        uid: 'TESTING',
    }
}

let store = mockStore(initState);// => estado del store de la aplicación cuando iniciamos sesión

describe('Pruebas con las acciones de notes', () => {

    /**
     * debemos limpiar el store después de cada prueba
     * para que no guarde todas las acciones que mandamos a ejecutar
     */

     beforeEach( () => {
         store = mockStore(initState);
     });

    //Para esto, instalamos redux-mock-store => npm install redux-mock-store --save-dev
    test('Debe de crear una nueva nota', async () => {
        /**
         * este dispatch es async, ya que en notes.js tenemos:
         * export const startNewNote = () => {
         *      return async ( dispatch, getState ) => {
         * 
         * por lo tanto debemos trabajar con el await
         */
        await store.dispatch( startNewNote() );
        /**
         * Nos dará error ya que no estamos autenticados en Firestore
         * Para esto debemos crear una bdd de desarrollo y poder realizar las pruebas
         * en un ambiente separado de producción.
         * Nunca debemos mezclar producción, desarrollo y test.
         */

         const actions = store.getActions();
         
         expect(actions[0]).toEqual({
             type: types.notesActive,
             payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
              }
         })

         expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
               id: expect.any(String),
               title: '',
               body: '',
               date: expect.any(Number)
             }
        })
        
        const docId = actions[1].payload.id;
        await db.doc(`TESTING/journal/notes/${docId}`).delete();
    })
    

    test('startLoadingNotes debe de cargar las notas', async() => {

        //await store.dispatch( startLoadingNotes('TESTING') );
        //const actions = store.getActions();
        // expect(actions[0]).toEqual({
        //     type: types.notesLoad,
        //     payload: expect.any(Array)
        // })

        // const expected = {
        //     id: expect.any(String),
        //     title: expect.any(String),
        //     body: expect.any(String),
        //     date: expect.any(Number)
        // }

        // expect(actions[0].payload[0]).toMatchObject( expected );

    });

    test('startSaveNote debe de actualizar la nota', async() => {
        
        const note = {
            id: '2EiC9rzpbXU7sE9krWNx',
            title: 'titulo',
            body: 'body'
        }

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();
        //console.log(actions);
        //console.log(actions[0].payload.note );

        expect( actions[0].type ).toBe( types.notesUpdated );
        expect( actions[0].payload.note.title ).toBe( 'titulo' );

        const docRef = await db.doc(`TESTING/journal/notes/2EiC9rzpbXU7sE9krWNx`).get();
        console.log(docRef);

        //expect( docRef.data().title ).toBe( note.title );

    })
    
    
    
})
