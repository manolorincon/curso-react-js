import React from 'react';
import GifGridItem from '../../components/GifGridItem';
import {shallow} from 'enzyme';

describe('Primer test para componentes', () => {

    test('Debe retornar OK', () => {

        const title = 'Goku'

        const url = 'https://static.t13.cl/images/original/2019/05/1557689182-goku.jpg'

        const wrapper = shallow(<GifGridItem title = {title} url = {url} />)
        
        expect(wrapper).toMatchSnapshot();
    })
    
    
})
