import { actions } from '../Actions';
import { put, all, takeEvery } from "redux-saga/effects";


function* CheckUser(v){
    yield put(actions.auth.request());

    if(v.payload.forauth){
        yield put(actions.auth.success({auth:true,uname:v.payload.uname,id:v.payload.id}));
    }else{
        yield put(actions.auth.failure({auth:false}));
    }

    yield put(actions.auth.fulfill());
}


export function* watchfun(){
    yield all([
        takeEvery(actions.auth.TRIGGER, CheckUser)
    ])
}