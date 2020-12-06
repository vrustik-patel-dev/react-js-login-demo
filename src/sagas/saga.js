import { actions } from '../Actions';
import { put, all, takeEvery } from "redux-saga/effects";
import Cookies from 'js-cookie';


function* CheckUser(v){

    yield put(actions.auth.request());

    if(v.payload.forauth){

        var userdata = localStorage.getItem(v.payload.id);
        userdata = JSON.parse(userdata);
        if(userdata){
            if (v.payload.password===userdata.password){
                if(v.payload.remember){
                    Cookies.set('username',v.payload.id);
                    Cookies.set('password',v.payload.password)
                }
                yield put(actions.auth.success({auth:v.payload.forauth,uname:userdata.fname}));
                sessionStorage.setItem("auth", true);
            }else{
                yield put(actions.auth.failure({auth:v.payload.forauth}));
                sessionStorage.setItem("auth", false);
            }
        }
    }else{
        yield put(actions.auth.success({auth:v.payload.forauth}));
        sessionStorage.setItem("auth", false);
    }
}

export function* watchfun(){
    yield all([
        takeEvery(actions.auth.TRIGGER, CheckUser)
    ])
}