import { actions } from '../Actions';


var initialState = {
    auth : false,
    id:'',
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
            console.log("Authentication fulfilled");
            return state;
        default :
            break;
    }
}

export default Reducerfunction;