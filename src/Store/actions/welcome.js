import * as actionTypes from './actionTypes';
import axios from 'axios';


export const nameStart = () => {
    return {
        type: actionTypes.NAME_START
    };
};

export const nameSuccess = ( userData) => {
    return {
        type: actionTypes.NAME_SUCCESS,
        name: userData
        // orderId: id,
        // orderData: orderData
    };
};

export const nameFail = ( error ) => {
    return {
        type: actionTypes.NAME_FAIL,
        error: error
    };
}
        // getting data from Welcome file and storing as userData and passing it to axios to post.
export const userName = ( name, token ) => {
    console.log("action",token)
    const userData= {
        name: name
    }
    return dispatch => {
        dispatch( nameStart());
        axios.post('https://map-building-7f022.firebaseio.com/names.json?auth=' + token, userData)
            .then( response => {
                console.log( response.data );
                dispatch( nameSuccess( response.data.names, userData ) );
            } )
            .catch( error => {
                dispatch( nameFail( error ) );
            } );
    };
};

export const fetchNameSuccess = (  ) => {
    return {
        type: actionTypes.FETCH_NAME_SUCCESS,
        // orders: orders
    };
};

export const fetchNameFail = ( error ) => {
    return {
        type: actionTypes.FETCH_NAME_FAIL,
        error: error
    };
};

export const fetchNameStart = () => {
    return {
        type: actionTypes.FETCH_NAME_START
    };
};

export const fetchName = (token, userId) => {
    return dispatch => {
        dispatch(fetchNameStart());
        // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( 'https://map-building-7f022.firebaseio.com/names.json')
            .then( res => {
                console.log(res)
                // const fetchedOrders = [];
                // for ( let key in res.data ) {
                //     fetchedOrders.push( {
                //         ...res.data[key],
                //         id: key
                //     } );
                // }
                // dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchNameFail(err));
            } );
    };
};