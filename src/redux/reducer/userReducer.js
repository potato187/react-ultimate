import {FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT} from "@redux/action/userAction.js";

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: ''
    },
    isAuthenticated: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {...state, account: {...action.payload}, isAuthenticated: true};
        case USER_LOGOUT:
            return INITIAL_STATE;
        default: return  state;
    }
};

export  default  userReducer;