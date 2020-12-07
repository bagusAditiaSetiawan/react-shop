import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingRedirect from './LoadingRedirect';
function UserRoute({ children, ...rest }) {
    const { user } = useSelector(state=>({...state}));
    return user.login ? <Route render={()=>children} {...rest} /> : <LoadingRedirect/>
}

export default UserRoute;