import { actions } from '../Actions';

var initialState = {
    auth : false,
    username : '',
}

const Reducerfunction = (state=initialState,action) => {


    switch (action.type){
        case actions.auth.TRIGGER :
            console.log(action);
            console.log("Authentication Started");
            return state;
        case actions.auth.REQUEST :
            console.log("Authentication Requested");
            return state;
        case actions.auth.SUCCESS :
            state.auth = true;
            console.log("Authentication Success")
            return state;
        case actions.auth.FAILURE :
            state.auth = false;
            return state;
        case actions.auth.FULFILL :
            return state;
    }
}

export default Reducerfunction;