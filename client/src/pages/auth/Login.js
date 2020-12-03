import { useState } from 'react';
import { auth, googleAuthProvider } from './../../firebase';
import { toast } from 'react-toastify';
import { MailOutlined, GoogleCircleFilled } from '@ant-design/icons'
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const Login = ({history}) =>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true)
        try{
            const result=  await auth.signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type:"LOGGED_IN_USER",
                payload:{
                    email:user.email,
                    password:idTokenResult.token,
                }
            })
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
            console.log(idTokenResult);
            dispatch({
                type:"LOGGED_IN_USER",
                payload:{
                    email:user.email,
                    token:idTokenResult.token
                }
            })
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