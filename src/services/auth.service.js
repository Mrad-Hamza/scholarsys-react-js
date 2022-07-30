import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/users/";

// const register = (username, firstname, password, lastname, mailAddress) => {
//     return axios.post(API_URL + "register", {
//         username,
//         firstname,
//         lastname,
//         mailAddress,
//         password
//     });
// };

// const login = (mailAddress, password) => {
//     return axios
//         .post(API_URL + "login", {
//             mailAddress,
//             password,
//         })
//         .then((response) => {
//             console.log(response.data)
//             if (response.data.accessToken) {
//                 localStorage.setItem("user", JSON.stringify(response.data.user));
//                 localStorage.setItem("token", JSON.stringify(response.data.accessToken))
//                 console.log(response.data)
//             }
//             return null;
//         });
// };

// const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token")
// };

const authService = {
    // register,
    // login,
    // logout,
};

export default authService;