import { useState } from 'react';
import { auth } from './../../firebase';
import {} from 'react-toastify';

const Register = () =>{

    const [email, setEmail] = useState("");

    const handleSubmit = () =>{

    }

    const RegisterForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control"
            onChange={(e)=>{
                setEmail(e.target.value);
            }}
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