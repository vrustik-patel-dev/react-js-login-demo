import { actions } from '../Actions';


var initialState = {
    auth : false,
    id:'',
    username : '',
    userdata : '',
}


const Reducerfunction = (state=initialState,action) => {

    switch (action.type){
        case actions.auth.TRIGGER :
            console.log("Authentication Started");
            return state;
        case actions.auth.REQUEST :
            console.log("Authentication Requested");
            return state;
        case actions.auth.SUCCESS :
            state.auth = action.payload.auth;
            if(action.payload.auth){
                state.username = action.payload.uname.fname;
                state.userdata = action.payload.uname;
                state.id = action.payload.id;
            }else{
                state.username = '';
            }
            console.log("Authentication Success");
            return state;
        case actions.auth.FAILURE :
            state.auth = action.payload.auth;
            console.log("Authentication closed");
            return state;
        case actions.auth.FULFILL :
            return state;
        default :
            break;
    }
}

export default Reducerfunction;