
import axios from 'axios';

export const listSubCategory = async (authToken) =>{
    return await axios.get(`${process.env.REACT_APP_API}/sub-categories`, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}

export const readSubCategory = async (authToken, slug) =>{
    return await axios.get(`${process.env.REACT_APP_API}/sub-categories/${slug}`, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}


export const removeSubCategory = async (authToken, slug) =>{
    return await axios.delete(`${process.env.REACT_APP_API}/sub-categories/${slug}`, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}


export const createSubCategory = async (authToken, { name, parent }) =>{
    return await axios.post(`${process.env.REACT_APP_API}/sub-categories`, {name, parent}, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}

export const updateSubCategory = async (authToken, slug, { name, parent }) =>{
    return await axios.put(`${process.env.REACT_APP_API}/sub-categories/${slug}`, {name, parent}, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}
