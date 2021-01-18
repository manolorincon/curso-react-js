import React from 'react'

export const LoginScreen = ({  history }) => {

    const handleLogin = () => {
        //history.push('/'); => redirecciona y agrega la url al history
        history.replace('/'); // => reemplaza la direccion anterior por esta nueva.
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
