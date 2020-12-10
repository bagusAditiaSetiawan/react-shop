import React, {useState} from 'react';
import UserNav from './../../components/nav/UserNav'; 
import { auth } from './../../firebase';
import { toast } from 'react-toastify';

const Password = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handlerSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        await auth.currentUser.updatePassword(password)
            .then(()=>{
                setLoading(false);
                toast.success("Successfull updated password");
            })
            .catch(e=>{
                toast.error(e.message);
                setLoading(false); 
            })
    }

    const formUpdatePassword = () => (
        <form onSubmit={handlerSubmit}>
            <div className="form-group">
                <input type="password" className="form-control" onChange={
                    (e) => setPassword(e.target.value)
                } placeholder="enter new  password" disabled={loading}/>
            </div>
            <button className="btn btn-primary">Save Changes</button>
        </form>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav/> 
                </div>
                <div className="col">
                   { loading ? (
                        <h4 className="text-danger">Loading...</h4>
                   ) : (
                        <h4>Update Password</h4>
                   ) }
                    {formUpdatePassword()}
                </div>
            </div>
        </div>
    )
}

export default Password;