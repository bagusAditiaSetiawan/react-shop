import { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from './../../firebase';
import { toast } from 'react-toastify';
import { MailOutlined, GoogleCircleFilled } from '@ant-design/icons'
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from './../../functions/auth';


const Login = ({history}) =>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector(state=>({...state}));

    useEffect(()=>{
        if(user.login){
            return history.push('/');
        }
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true)
        try{
            const result=  await auth.signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token).then(res=>{                
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
            }).catch(error=>{
                toast.error(error);
            });            
            history.push('/');
        }catch(error){
            toast.error(error.message);
            setLoading(false);
        }
    }

    const LoginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" className="form-control"
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}
                value={email}
                placeholder="Email" autoFocus />
            </div>
            <div className="form-group">
                <input  className="form-control"
                type="password"
                onChange={(e)=>(setPassword(e.target.value))}
                value={password}
                />
            </div>           
          
            <Button onClick={handleSubmit}  type="primary" className="mb-3" block shape="round" icon={<MailOutlined/>} size="large"
            disabled={!email || password.length < 6}
            >
                Login With Email and Password
            </Button>
        </form>
    )

    const googleLogin = () =>{
        auth.signInWithPopup(googleAuthProvider).then(async (result)=>{
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token).then(res=>{                
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
            }).catch(error=>{
                toast.error(error);
            });     
            history.push('/');
        }).catch(e=>toast.error(e.message));
    }

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? <h2 className="text-danger">Loading ...</h2> : <h2>Login</h2>}
                    {LoginForm()}
                    <Button onClick={googleLogin}  type="danger" className="mb-3" block shape="round" icon={<GoogleCircleFilled/>} size="large"
                  
                    >
                        Login With Google
                    </Button>
                    <Link to="forgot/password" className="float-right text-danger">Forgot Passsword ? </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;