import AdminNav from "../../../components/nav/AdminNav";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { listCategory, removeCategory, createCategory } from '../../../functions/category';
import LocalSearch from '../../../components/form/LocalSearch';

const CategoryList = () =>{
    const { user } = useSelector(state=>({...state}));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('');
    useEffect(()=>{
        loadCategories();
    },[]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const category = await createCategory(user.login.token, {name});
            toast.success(`${category.data.name} successfully insert`);
            setName('');            
            setLoading(false);
            loadCategories();
        }catch(e){
            toast.error(e.response.data.error);            
            setLoading(false);
        }
    }

    const loadCategories = () =>{
        listCategory(user.login.token).then(res=>{
            setCategories(res.data);
        })
    }

    const deleteHandler = (slug) =>{
        setLoading(true);
        removeCategory(user.login.token, slug).then(res=>{
            loadCategories();
            toast.success(`Successfully delete ${res.data.name} category`);
            setLoading(false);
        });
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

    const searched = (keyword) => (category) => category.name.toLowerCase().includes(keyword);

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
                    <LocalSearch setKeyword={setKeyword} keyword={keyword}/>
                    {
                        categories.filter(searched(keyword)).map(category=>(
                            <div className="alert alert-secondary justify-content-between d-flex" key={category._id}>
                            <span>                                
                               {category.name}
                            </span>    
                            <div>
                               <button  className="btn btn-danger" onClick={()=>deleteHandler(category.slug)}><DeleteOutlined/></button> 
                               <Link  className="btn btn-info"  to={`/admin/categories/edit/${category.slug}`}><EditOutlined/></Link>
                            </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryList;