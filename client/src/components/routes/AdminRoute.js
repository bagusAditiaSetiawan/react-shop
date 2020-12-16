import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingRedirect from './LoadingRedirect';
import {  currentAdmin } from './../../functions/auth'; 
function AdminRoute({ children, ...rest }) {
    const [ok,  setOk] = useState(false); 
    const { user } = useSelector(state=>({...state}));

    useEffect(()=>{
        if(user.login){
            currentAdmin(user.login.token).then(res=>{
                setOk(true);
            }).catch(e=>{
                setOk(false);
            })
        }
    },[user]);


    return  ok ? <Route render={()=>children} {...rest} /> : <LoadingRedirect/>
}

export default AdminRoute;