import { useState, useEffect } from 'react';
import { auth } from './../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPassword = () => {
    const [ email, setEmail ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const dispath = useDispatch();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD,
            handleCodeInApp: true,
        }
        auth.sendPasswordResetEmail(email, config).then(result=>{
            setLoading(false);
            setEmail('');
            toast.success(`Check Your Email In ${email}`);
        }).catch(error=>{
            setLoading(false);
            toast.error(error.message)
        })
    }


    return (
        <div className="container col-md-6 offset-md-3 p-5">
            { loading ? ( <h2>Loading .... </h2>) : ( <h2>Enter Email</h2> )  } 
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input className="form-control"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    autoFocus/>
                </div>
                <button className="btn btn-raised" disabled={
                    !email ? true : false
                }>Send</button>
            </form>
        </div>
    );
}

export default ForgotPassword