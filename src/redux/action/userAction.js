export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const userLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}