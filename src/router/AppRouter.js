import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { LoginScreen } from '../auth/LoginScreen'
import { CalendarScreen } from '../calendar/CalendarScreen'

export const AppRouter = () => {
    return (
        /**
         * exact /login => LoginScreen
         * exact / => CalendarScreen
         */
        <Router>
            <div>
                <Switch>
                    <Route
                        exact
                        path="/login"
                        component={ LoginScreen }
                    />

                    <Route
                        exact
                        path="/"
                        component={ CalendarScreen }
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>

    )
}
