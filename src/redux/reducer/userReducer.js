import {FETCH_USER_LOGIN_SUCCESS} from "@redux/action/userAction.js";

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
            console.log(action.payload);
            return {...state, account: {...action.payload}, isAuthenticated: true};
        default: return  state;
    }
};

export  default  userReducer;