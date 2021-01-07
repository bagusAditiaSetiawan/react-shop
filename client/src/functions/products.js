
import axios from 'axios';

export const createProduct = async (authToken,product) =>{
    const {
        title, description, price, sub_category, category, quantity, 
        sold, images, shipping, color, brand
    } = product;
    return await axios.post(`${process.env.REACT_APP_API}/products`, {
        title, description, price, sub_category, category, quantity, 
        sold, images, shipping, color, brand}, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}
