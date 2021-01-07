import AdminNav from "../../components/nav/AdminNav";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProduct } from '../../functions/products';
import { listCategory } from './../../functions/category';
import ProductCreateForm from './../../components/form/ProductCreateForm';

const initialState = {
    title:'',
    description:'',
    price:'',
    category:'',
    sub_category:'',
    quantity:0,
    images:[],
    color:"",
    brand:"",
    colors:['Black','Brown','Yellow','White','Red','Green','Blue'],
    brands:['Apple','Samsung','Hp','Microsoft','Lenovo','Asus'],
    shipping: '',
    categories:[],
    subcategories:[]

}


const ProductCreate = () =>{
    const [values, setValues] = useState(initialState); 
    const {user} = useSelector(state=>({...state}));

    useEffect(() => {
      loadCategories();
    },[])

    const loadCategories = () => {
        listCategory(user.login.token).then(res=>setValues({...values, categories:res.data}));
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        createProduct(user.login.token, values).then(e=>{
            toast.success('Successfully insert product');
            setValues(initialState)
        }).catch(e=>{
            toast.error(e.response.data.err.message);
        })
    }

    const handleChanged = (e) =>{
        setValues({...values, [e.target.name]:e.target.value})
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2"><AdminNav/></div>
                <div className="col-10">
                   <h4>Product Create</h4>
                   <ProductCreateForm handleSubmit={handleSubmit} handleChanged={handleChanged} values={values} />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;