import AdminNav from "../../../components/nav/AdminNav";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {  } from '@ant-design/icons';
import { readCategory, updateCategory } from '../../../functions/category';


const CategoryUpdate  = ({history}) =>{
    const { user } = useSelector(state=>({...state}));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();

    useEffect(()=>{
        loadCategory();
    },[]);


    const loadCategory = () => {
        readCategory(user.login.token, slug).then(res=>{
            setName(res.data.name)
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const category = await updateCategory(user.login.token, slug, {name});
            toast.success(`${category.data.name} successfully updated`);
            setName('');            
            setLoading(false);
            history.push('/admin/categories');
        }catch(e){
            toast.error(e.response.data.error);            
            setLoading(false);
        }
    }

    const formCategory = () =>{
        return (<form onSubmit={submitHandler}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" value={name} onChange={(e)=>{
                    setName(e.target.value)
                }} className="form-control" autoFocus required/>
                <button className="btn btn-outline-primary mt-2">Save</button>
            </div>
        </form>
        )
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {
                        loading ? (
                            <h4>Loading...</h4>
                        ) : (
                            <h4>Form Category</h4>
                        )
                    } 
                    {formCategory()}
                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate;