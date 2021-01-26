import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui);

    const [formValues, handleInputChange] = useForm({
        name: 'Hernando',
        email: 'nando@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if( isFormValid() ){
            dispatch( startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = () => {
        if( name.trim().length === 0 ){
            console.log('name is required');
            dispatch(setError('name is required'));
            return false;
        }else if( !validator.isEmail( email) ){
            console.log('email is invalid')
            dispatch(setError('email is invalid'));
            return false;
        }else if( password !== password2 || password.length < 6){
            console.log('Password must be min 6 characters');
            dispatch(setError('Password must be min 6 characters'));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit ={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >

               {
                   msgError &&
                   (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={ name }
                    onChange={ handleInputChange }
                    className="auth__input"
                    autoComplete="off"
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={ email }
                    onChange={ handleInputChange }
                    className="auth__input"
                    autoComplete="off"
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={ password }
                    onChange={ handleInputChange }
                    className="auth__input"
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={ password2 }
                    onChange={ handleInputChange }
                    className="auth__input"
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
