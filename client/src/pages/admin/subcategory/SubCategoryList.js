import AdminNav from "../../../components/nav/AdminNav";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { listSubCategory, removeSubCategory, createSubCategory } from '../../../functions/subcategory';
import { listCategory } from '../../../functions/category';
import LocalSearch from '../../../components/form/LocalSearch';

const SubCategoryList = () =>{
    const { user } = useSelector(state=>({...state}));
    const [name, setName] = useState('');
    const [parent, setParent] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [keyword, setKeyword] = useState('');
    useEffect(()=>{
        loadCategories();
        loadSubCategories();
    },[]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const subcategory = await createSubCategory(user.login.token, {name, parent});
            toast.success(`${subcategory.data.name} successfully insert`);
            setName('');              
            setParent('');              
            setLoading(false);
            
            loadSubCategories();
        }catch(e){
            toast.error(e.response.data.error);            
            setLoading(false);
        }
    }

    const loadSubCategories = () =>{
        listSubCategory(user.login.token).then(res=>{
            setSubCategories(res.data);
        })
    }

    const loadCategories = () =>{
        listCategory(user.login.token).then(res=>{
            setCategories(res.data);
        })
    }

    const deleteHandler = (slug) =>{
        setLoading(true);
        removeSubCategory(user.login.token, slug).then(res=>{
            toast.success(`Successfully delete ${res.data.name} sub category`);
            
            loadSubCategories();
            setLoading(false);
        });
    }

    const formSubCategory = () =>{
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

    const searched = (keyword) => (subcategory) => subcategory.name.toLowerCase().includes(keyword);

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
                    {formSubCategory()}
                    <LocalSearch setKeyword={setKeyword} keyword={keyword}/>
                    {
                        subcategories.filter(searched(keyword)).map(subcategory=>(
                            <div className="alert alert-secondary justify-content-between d-flex" key={subcategory._id}>
                            <span>                                
                               {subcategory.name}
                            </span>    
                            <div>
                               <button  className="btn btn-danger" onClick={()=>deleteHandler(subcategory.slug)}><DeleteOutlined/></button> 
                               <Link  className="btn btn-info"  to={`/admin/categories-sub/edit/${subcategory.slug}`}><EditOutlined/></Link>
                            </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SubCategoryList;