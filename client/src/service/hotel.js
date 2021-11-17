import axios from 'axios';
import { toast } from 'react-toastify';

export const createHotel = async (token, hotelData) => {
    try {
        let response = await axios.post(`${process.env.REACT_APP_API}/hotels/create-hotel`, hotelData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;

    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error(error.response.data.message);
    }
}

export const getAllHotels = async () => {
    try {
        let response = await axios.get(`${process.env.REACT_APP_API}/hotels/get-hotels`);
        return response.data.hotels;

    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error('Unable to fetch hotels');
    }
}

export const getSellerHotels = async (token) => {
    try {
        let response = await axios.get(`${process.env.REACT_APP_API}/hotels/seller-hotels`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;

    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error('Unable to fetch seller hotels');
    }
}

export const deleteHotel = async (token, hotelId) => {
    try {
        let response = await axios.delete(`${process.env.REACT_APP_API}/hotels/delete-hotel/${hotelId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;

    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error('Unable to delete hotel');
    }
}

export const fetchHotel = async (hotelId) => {
    try {
        let response = await axios.get(`${process.env.REACT_APP_API}/hotels/hotel-details/${hotelId}`);
        return response.data;

    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error('Unable to fetch hotel data');
    }
}

export const updateHotel = async (token, hotelId, hotelData) => {
    try {
        let response = await axios.put(`${process.env.REACT_APP_API}/hotels/hotel-details/${hotelId}`, hotelData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;

    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error(error.response.data.message);
    }
}

export const fetchUserHotels = async (token) => {
    try {
        let response = await axios.get(`${process.env.REACT_APP_API}/hotels/user-hotels`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;

    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error(error.response.data.message);
    }
}

export const isBooked = async (token, hotelId) => {
    try {
        let response = await axios.get(`${process.env.REACT_APP_API}/hotels/booking-status/${hotelId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.booked;

    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error(error.response.data.message);
    }
}

export const searchHotels = async (query) => {
    try {
        let response = await axios.post(`${process.env.REACT_APP_API}/hotels/search-hotel`, query);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response.status) toast.error(error.response.data.message);
    }
}