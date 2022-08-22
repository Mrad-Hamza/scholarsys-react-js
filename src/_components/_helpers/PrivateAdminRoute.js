import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateTeacherRoute = ({ component: Component, path }: RouteProps) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { isLoggedIn } = useSelector((state) => state.auth);


    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }
    if (parseInt(currentUser.role) !== 1999) {
        return <Redirect to="/unauthorized" />;
    }

    return <Route component={Component} path={path} />;
};

export default PrivateTeacherRoute;