import axios from 'axios';
import { toast } from 'react-toastify';

const url = process.env.REACT_APP_API

export const createUserApi = async (userDetails) => {
    try {
        let response = await axios.post(`${url}/users/register`, userDetails);
        toast.success("Registed Successfully. Please login")
        return response;
    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error(error.response.data.message);
    }
}

export const loginUserApi = async (user) => {
    try {
        let response = await axios.post(`${process.env.REACT_APP_API}/users/login`, user);
        toast.success("Successfully logged in.");
        return response.data;
    } catch (error) {
        if (error.response.status) toast.error(error.response.data.message);
    }
}

export const updateUserInLocalStorage = (user, next) => {
    if (localStorage.getItem('auth')) {
        let auth = JSON.parse(localStorage.getItem('auth'));
        auth.user = user;
        localStorage.setItem('auth', JSON.stringify(auth));
        next();
    }
}