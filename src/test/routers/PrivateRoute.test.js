import { mount, configure } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../../routers/PrivateRoute';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


describe('Pruebas en <PrivateRoute />', () => {

    configure({adapter: new Adapter()});

    const props = {
        location: {
            pathname: '/marvel'
        }
    }
    
    test('Debe mostrar el componente si está autenticado y guardar en localStorage', () => {
        
        //utilizamos mount para ir mas al fondo
        //por el tipo de estructura MemoryRouter
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={true}
                    component={ () => <span>Listo!</span>}
                    { ...props } 
                />
            </MemoryRouter>
        );

    })
    
})
