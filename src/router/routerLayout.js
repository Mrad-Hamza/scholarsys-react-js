import React from 'react';
import { Router, Route } from 'react-router-dom';
//Import Layouts
import { AdminLayout, LoginLayout } from '../_components/layouts';
import config from 'config';

//Admin Layout
export const AdminLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <AdminLayout>
                <Component {...matchProps} />
            </AdminLayout>
        )} />
    )
};

// Login Layout
// export const LoginLayoutRoute = ({ component: Component, ...rest }) => {
//     return (
//         <Route {...rest} render={matchProps => (
//             <LoginLayout>
//                 <Component {...matchProps} />
//             </LoginLayout>
//         )} />
//     )
// };

const LoginLayoutRoute = (props) => {
    return(
        <Router basename={`${config.publicPath}`}>
            <Route render={(props)=> <LoginLayout {...props}/>} />
        </Router>
    );    
}
export {LoginLayoutRoute};