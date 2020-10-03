import * as actionTypes from '../actions/actionTypes'
import {updateObject} from './utility';

const initialState = {
    token : null,
    error: null,
    loading: false,
    userName : null
}

const nameStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const nameSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
     } );
};

const nameFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};
// const fetchNameStart = (state, action) => {
//     return updateObject( state, {
//         error: action.error,
//         loading: false
//     });
// };
// const fetchNameSucces = (state, action) => {
//     return updateObject( state, {
//         error: action.error,
//         loading: false
//     });
// };
// const fetchNameFail = (state, action) => {
//     return updateObject( state, {
//         error: action.error,
//         loading: false
//     });
// };


 const reducer =(state= initialState, action)=> {
    switch(action.type){
        case actionTypes.NAME_START : 
        return nameStart(state,action);
        case actionTypes.NAME_SUCCESS : 
        return nameSuccess(state,action);
        case actionTypes.NAME_FAIL : 
        return nameFail(state,action);
        // case actionTypes.FETCH_NAME_START : 
        // return fetchNameStart(state,action);
        // case actionTypes.FETCH_NAME_SUCCESS : 
        // return fetchNameSucces(state,action);
        // case actionTypes.FETCH_NAME_FAIL : 
        // return fetchNameFail(state,action);
        default:return state;
    }
}

export default reducer;