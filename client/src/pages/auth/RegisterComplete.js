import { useState } from 'react';
import { auth } from './../../firebase';
import { toast } from 'react-toastify';

const RegisterComplete = ({history}) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    useState(()=>{
        setEmail(window.localStorage.getItem('emailForRegistration'));
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!email || !password){
            toast.error('Email and Password Required');
            return;
        }

        if(password.length < 6){
            toast.error('password should 6 char or more')
            return;
        }

        auth.signInWithEmailLink(email, window.location.href).then(res=>{
            if(res.user.emailVerified){
                window.localStorage.removeItem('emailForRegistration');                
                let user = auth.currentUser;
                window.localStorage.setItem('user', user);
                user.updatePassword(password).then(()=>{
                    user.getIdTokenResult().then(token=>{
                        window.localStorage.setItem('token', token);

                        history.push('/');
                    });
                });
                
            }
        }).catch(error=>{
            toast.error(error.message);
        });
       
        
    }

    const CompleteRegisterForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control"
            value={email} disabled/>
              <input type="password" className="form-control"
            onChange={(e)=>{
                setPassword(e.target.value);
            }}
            value={password}
            placeholder="Password" autoFocus />
            <button type="submit" className="btn btn-raised">Register</button>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Complete Register</h4>
                    {CompleteRegisterForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;