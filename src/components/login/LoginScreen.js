import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types'

export const LoginScreen = ({  history }) => {

    const { dispatch } = useContext( AuthContext );

    const handleLogin = () => {
        // history.push('/'); => redirecciona y agrega la url al history
        // history.replace('/'); // => reemplaza la direccion anterior por esta nueva.
        
        // Manera Larga: 
        // const user = {
        //     name: 'Manuel'
        // }

        // const loginUser = {
        //     type: types.login,
        //     payload: user
        // }

        // const login = authReducer(user, loginUser);
        // console.log(login);

        // Resumido:

        const lastPath = localStorage.getItem('lastPath');

        dispatch({
            type: types.login,
            payload: {
                name: 'Poncho'
            }
        });

        history.replace(lastPath);

    }

    return (
        <div className="container mt-5">
            <h1>Login Screen</h1>
            <hr />

            <button 
                className="btn btn-primary"
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    )
}
