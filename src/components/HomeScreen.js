import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSubmitDiaSemana } from '../actions/home';

export const HomeScreen = () => {

    const dispatch = useDispatch();

    const { diaSemana, submit } = useSelector( state => state.home);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch( startSubmitDiaSemana() );
    }
    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <label htmlFor='nombre'>Nombre</label><br />
                <input type='text' name='nombre' placeholder='ingresa el nombre' />
                <input type='submit' value='Enviar' />
            </form>

            {
                submit &&
                (
                    <h2>Cargando...</h2>
                )
            }

            {
                diaSemana !== '' &&
                (
                    <h2> { diaSemana } </h2>
                )
            }
        </div>
    )
}
