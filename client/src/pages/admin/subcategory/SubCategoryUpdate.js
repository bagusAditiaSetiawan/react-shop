import AdminNav from "../../../components/nav/AdminNav";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {  } from '@ant-design/icons';
import { readSubCategory, updateSubCategory } from '../../../functions/subcategory';
import { listCategory } from '../../../functions/category';


const SubCategoryUpdate  = ({history}) =>{
    const { user } = useSelector(state=>({...state}));
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState('');
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();

    useEffect(()=>{
        loadCategories();
        loadCategorySub();
    });


    const loadCategories = () => {
        listCategory(user.login.token).then(res=>{
            setCategories(res.data);
        })
    }


    const loadCategorySub = () => {
        readSubCategory(user.login.token, slug).then(res=>{
            setParent(res.data.parent);
            setName(res.data.name);
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const category = await updateSubCategory(user.login.token, slug, {name, parent});
            toast.success(`${category.data.name} successfully updated`);
            setName('');            
            setLoading(false);
            history.push('/admin/categories-sub');
        }catch(e){
            toast.error(e.response.data.error);            
            setLoading(false);
        }
    }

    const formCategory = () =>{
        return (<form onSubmit={submitHandler}>
            <div className="form-group">
                <label>Parent</label>
                <select className="form-control" value={parent} onChange={e=>(setParent(e.target.value))}>
                    <option value="">Select Category</option>
                    { categories && (
                        categories.map(category=>(
                            <option value={category._id}
                            key={category._id}                            
                            >{category.name}</option>
                        ))
                    )}
                </select>
            </div>
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
                            <h4>Form Sub Category</h4>
                        )
                    } 
                    {formCategory()}
                </div>
            </div>
        </div>
    )
}

export default SubCategoryUpdate;