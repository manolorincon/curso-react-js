import React from 'react'
import { HomeScreen } from './HomeScreen';

export default class Index extends React.Component {
    
    componentDidMount(){
        const ele = document.getElementById('loading');
        ele.innerHTML = '';
        document.body.style.background = 'white';
    }

    render() {

        return (
            <div>
                <HomeScreen />
            </div>
        )
    }
}
