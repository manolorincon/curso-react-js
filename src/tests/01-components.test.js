import React from 'react';
import GifExpertApp from '../GifExpertApp';
import {shallow} from 'enzyme';

describe('Primer test para componentes', () => {

    test('Debe retornar OK', () => {

        const wrapper = shallow(<GifExpertApp />)
        
        expect(wrapper).toMatchSnapshot();
    })
    
    
})
