import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from "redux-thunk";


import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';
import { LoginScreen } from '../../../components/auth/LoginScreen';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares); // => funcion que permite crear un store

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en el <LoginScreen />', () => {

    beforeEach( () => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });


    test('Debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('Debe de disparar la acción startGoogleLogin', () => {
        
        //En el find, utilizamos un punto ya que estamos buscando una clase
        wrapper.find('.google-btn').prop('onClick')(); //estamos disparando esta accion
        expect( startGoogleLogin ).toHaveBeenCalled();

    })

    test('Debe de disparar el startLogin con los respectivos argumentos', () => {
        
        //En el find, utilizamos un punto ya que estamos buscando una clase
        wrapper.find('form').prop('onSubmit')({ 
            preventDefault(){}
        });

        expect( startLoginEmailPassword ).toHaveBeenLastCalledWith('','');// En '' porque asi tenemos el initialState en el useForm
        
    })
    
    
    
})
