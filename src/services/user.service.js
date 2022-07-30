import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/users/";

// const getAllUsers = () => {
//     const requestOptions = {
//         method: "GET",
//         headers: authHeader(),

//     };
//     return axios.get(API_URL, requestOptions);
// };

// const deleteUser = (id) => {
//     const requestOptions = {
//         method: "DELETE",
//         headers: authHeader(),
//     };
//     return axios.delete(API_URL + id, requestOptions)
// }

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

const userService = {
    // getAllUsers,
    // deleteUser,
    // getUserByMail,
};

export default userService