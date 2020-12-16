
import axios from 'axios';

export const createOrUpdateUser = async (authToken) =>{
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}


export const currentUser = async (authToken) => {
    return await  axios.post(`${process.env.REACT_APP_API}/current-user`, {}, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}

export const currentAdmin = async (authToken) => {
    return await  axios.post(`${process.env.REACT_APP_API}/current-admin`, {}, {
        headers:{
            authorization:`barrier ${authToken}`
        }
    });
}