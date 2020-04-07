import axios from 'axios';
//import { createHashHistory } from 'history';

const TIMEOUT = 4000;
const BASE_URL = 'http://localhost:3000/';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
            //'Access-Control-Allow-Origin': 'http://localhost:3005',
            //'Authorization': "getTokenSession()",
            'Content-Type': 'application/json'
        }
    });


export function getUserSession() {
    return (!localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;
}

export function removeUserSession() {
    localStorage.removeItem('user');
}

export function setUserSession(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function removeTokenSession() {
    localStorage.removeItem('token');
}

export function setTokenSession(token) {
    localStorage.setItem('token', token);
}

export function userLogged() {
   return !!getTokenSession();
}

axiosInstance.interceptors.request.use(
    request => interceptorRequest(request)
)

axiosInstance.interceptors.response.use(
    response => interceptorResponseSuccess(response),
    //error => interceptorResponseError(error)
)

function interceptorRequest(request) {
    
    if (
        request.url !== 'login' &&
        request.url !== 'sign-up'
    ) {
        request.headers.Authorization = getTokenSession();
    }
    
    return request;
}

function interceptorResponseSuccess(response) {
    //const history = createHashHistory();
    if (response.config.url === 'login') {
        const data = response.data.data;
         setTokenSession(data.token);
         setUserSession(data.user);      
    }
    // if (response.status === 401) {
    //     console.log('history',history)
    //     history.push('/login')
    // }
    return response;
}

function interceptorResponseError(error) {
    return error.response;
}

function getTokenSession() {
    return localStorage.getItem('token') || null;
}
