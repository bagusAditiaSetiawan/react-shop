import { useState, useEffect } from 'react';
import { auth } from './../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const Register = ({history}) =>{
    const [email, setEmail] = useState("");

    const { user } = useSelector(state=>({...state}));

    useEffect(()=>{
        if(user.login){
            return history.push('/');
        }
    },[user, history])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_COMPLETE_REGISTER_URL,
            handleCodeInApp: true,

        }
        await auth.sendSignInLinkToEmail(email, config);

        toast.success(`Email  is sent to ${email}. click the link for complete your registration`);
        //save email in local storage
        window.localStorage.setItem('emailForRegistration', email);
        //clear email
        setEmail("");
    }

    const RegisterForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control"
            onChange={(e)=>{
                setEmail(e.target.value);
            }}
            value={email}
            placeholder="Email" autoFocus />
            <button type="submit" className="btn btn-raised">Register</button>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {RegisterForm()}
                </div>
            </div>
        </div>
    )
}

export default Register;