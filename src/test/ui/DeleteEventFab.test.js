import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { DeleteEventFab } from '../../ui/DeleteEventFab';
import { eventStartDelete } from '../../actions/events';


jest.mock('../../actions/events', () => ({
    eventStartDelete: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore( initState );
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store } >
        <DeleteEventFab />
    </Provider>
)

describe('Pruebas en <DeleteEventFab />', () => {    

    test('debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de llamar el eventStartDelete', () => {
        //wrapper.find('button').simulate('click');
        //podemos hacer un console log en el evento para saber que se esté llamando
        wrapper.find('button').prop('onClick')();
                
        expect( eventStartDelete ).toHaveBeenCalled();

    })
    
})