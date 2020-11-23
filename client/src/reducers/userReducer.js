export const  userReducer = (state = {}, action) => {
    switch(action.type){
        case 'LOGGED_IN_USER':{
            return {...state, login:action.payload}
        }
        case 'LOGOUT':{
            return {...state, login:action.payload}
        }
        default:{
            return { ...state}; 
        }
    }
}