import { actions } from '../Actions';
import { put, all, takeEvery } from "redux-saga/effects";


function* checkUser(){
    console.log("Called from saga");
}

export function* watchfun(){
    yield all([
        takeEvery(actions.auth.TRIGGER, checkUser)
    ])
}