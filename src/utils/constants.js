export const HOST = import.meta.env.VITE_SERVER_URL;


export const AUTH_ROUTES = `${HOST}/api/auth`;
export const SIGNUP_ROUTES = `${AUTH_ROUTES}/signup`;
export const OTP_ROUTES = `${AUTH_ROUTES}/verifyemail`;
export const GET_USER_INFO = `${AUTH_ROUTES}/userinfo`;
export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`;

export const ADD_CATEGORY_ROUTE = `${AUTH_ROUTES}/addcategory`;

export const GET_CATEGORY_ROUTE = `${HOST}/api/category`;


export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;