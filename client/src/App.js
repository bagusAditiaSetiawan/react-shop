import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { currentUser } from './functions/auth';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';


import Home from './pages/home/Index';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import UserRoute from './components/routes/UserRoute';
import UserHistory from './pages/user/History';


const App = () => {

  const dispatch = useDispatch();

  //to check firebase state

  useEffect(()=>{
      const unsubcribe = auth.onAuthStateChanged( async (user) =>{
        if(user){
          const idTokenResult = await user.getIdTokenResult();

          currentUser(idTokenResult.token).then(res=>{
            dispatch({
              type:"LOGGED_IN_USER",
              payload:{
                  _id:res.data._id,
                  name:res.data.name,
                  email:res.data.email,
                  token:idTokenResult.token,
                  role:res.data.role
              }
            })
          })
        }

        return unsubcribe;
      });
  });

  return (
    <>
        <Header />
        <ToastContainer/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/register/complete" exact component={RegisterComplete} />
          <Route path="/forgot/password" exact component={ForgotPassword} />
          <UserRoute path="/user/history" exact component={UserHistory} />
        </Switch>
    </>
  );
}

export default App;
