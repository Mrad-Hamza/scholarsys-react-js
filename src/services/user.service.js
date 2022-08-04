import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/";

const getAllUsers = () => {
    const requestOptions = {
        method: "GET",
    };
    return axios.get(API_URL + "user/", requestOptions);
};

const getUser = (id) => {
    const requestOptions = {
        method: "GET",
    };
    return axios.get(API_URL + "user/" + id, requestOptions)
}


const deleteUser = (id) => {
    const requestOptions = {
        method: "DELETE",
    };
    return axios.delete(API_URL + "user/" + id, requestOptions)
}

// const getUserByMail = (mail) => {
//     const requestOptions = {
//         method: "GET",
//         headers: authHeader(),
//     };
//     return axios
//         .get(API_URL + "/mail/" + mail, requestOptions)
//         .then((response) => {
//             return response.data
//         });
// }

const register = (email, password, name) => {
    return axios
        .post(API_URL + "user/", {
            email,
            password,
            name
        })
        .then((response) => {
            return response.data
        })
}


const editUser = (id, firstname, lastname, email, password, phoneNumber, birthDate ) => {
    return axios
        .patch(API_URL + "user/"+id, {
            firstname,
            lastname,
            email,
            password,
            phoneNumber,
            birthDate
        })
        .then((response) => {
            return response.data
        })
}


const forgotPassword = (email) => {
    return axios
        .post(API_URL + "reset_password", {
            email
        })
        .then((response) => {
            return response.data
        })
}

const userService = {
    register,
    forgotPassword,
    getAllUsers,
    getUser,
    deleteUser,
    editUser,
    // getUserByMail,
};

export default userService