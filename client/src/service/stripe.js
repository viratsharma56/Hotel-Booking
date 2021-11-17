import axios from 'axios'
import { toast } from 'react-toastify';

export const createStripeAccount = async (token) => {
    try {
        let response = await axios.post(`${process.env.REACT_APP_API}/users/create-stripe-account`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error('Stripe not connected, try again!');
    }
}

export const getAccountStatus = async (token) => {
    try {
        let response = await axios.post(`${process.env.REACT_APP_API}/users/get-account-status`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.updateUser;
    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error(error.response.data.message);
    }
}

export const getAccountBalance = async (token) => {
    try {
        let response = await axios.post(`${process.env.REACT_APP_API}/users/get-account-balance`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.balance;
    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error(error.response.data.message);
    }
}

export const getSessionId = async (token, hotelId) => {
    try {
        let response = await axios.post(`${process.env.REACT_APP_API}/users/get-session-id`, { hotelId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error(error.response.data.message);
    }
}

export const stripeSuccess = async (token, hotelId) => {
    try {
        let response = await axios.post(`${process.env.REACT_APP_API}/users/stripe-success`, { hotelId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error(error.response.data.message);
    }
}