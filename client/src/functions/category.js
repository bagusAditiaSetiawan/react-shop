
import axios from 'axios';

export const listCategory = async (authToken) =>{
    return await axios.get(`${process.env.REACT_APP_API}/categories`, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}

export const readCategory = async (authToken, slug) =>{
    return await axios.get(`${process.env.REACT_APP_API}/categories/${slug}`, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}


export const removeCategory = async (authToken, slug) =>{
    return await axios.delete(`${process.env.REACT_APP_API}/categories/${slug}`, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}


export const createCategory = async (authToken, { name }) =>{
    return await axios.post(`${process.env.REACT_APP_API}/categories`, {name}, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}

export const updateCategory = async (authToken, slug, { name }) =>{
    return await axios.put(`${process.env.REACT_APP_API}/categories/${slug}`, {name}, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}
