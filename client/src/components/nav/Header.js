import React, { useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, UserAddOutlined, SettingOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import  { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; 

const { SubMenu, Item } = Menu;

const Header = () => {   
    const history = useHistory();
    const dispatch = useDispatch();
    const { user } = useSelector(state=>({...state}));
    const [current, setCurrent] = useState('home');

    const handleClick = (e) => {
        setCurrent(e.key);
    }

    const logout = (e) =>{
        firebase.auth().signOut();
        dispatch({
            type:"LOGOUT",
            payload:null
        });
        history.push('/login'); 
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">
                  Home
                </Link>
            </Item>          
            {
                !user.login && (
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register">
                       Register
                     </Link>
                 </Item>
                )
            }  
             {
                !user.login && (
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">
                      Login
                    </Link>
                </Item>
                )
            }  
            {
                user.login && (
                    <SubMenu key="SubMenu" icon={<SettingOutlined />} title={ user.login.email } className="float-right">
                        <Item key="setting:1">{  user.login.email.split('@')[0] }</Item>
                        <Item key="setting:2">Option 2</Item>
                        <Item key="logout" icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
                    </SubMenu>
                )      
            }
        </Menu>
    )
}


export default Header;