import React, { useEffect, useState } from 'react';
import { firebase } from '../firebase/firebase-config';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    //creamos un useState para saber si está comprobando el estado del logging antes de renderizar el componente
    const [ checking, setChecking ] = useState(true);
    //creamos un useState para saber si está loggeado o no
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    useEffect(() => {

        //firebase me indica cuando el estado de la autenticacion cambia
        firebase.auth().onAuthStateChanged( async (user) => {

            if ( user?.uid ) {
                dispatch(login( user.uid, user.displayName ));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));
            }else{
                setIsLoggedIn(false);
            }

            setChecking(false);

        });

    }, [ dispatch, setChecking ])

    if( checking ){
        return(
            <h1 className="auth__main">Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isLoggedIn = { isLoggedIn }
                    />

                    <PrivateRoute 
                        exact
                        path="/"
                        component={ JournalScreen }
                        isLoggedIn = { isLoggedIn }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
