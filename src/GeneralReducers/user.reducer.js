
var initialState = {
    username: '',
    passowrd: '',
    auth_token: ''
}

export default function userReducer(state = initialState, action) {

    switch (action.type) {
        case "SET_AUTH_TOKEN":
            sessionStorage.setItem("auth_token", action.payload.auth_token);
            state = setAuthToken(state, action.payload);
            break;

        case "SET_USER_INFO":
            break;    

        default:
            return state;           
    }
    return state;
}

var setAuthToken = function (state, payload) {
    state = payload;
    console.log('setting auth token'+JSON.stringify(payload));
    return state;
}