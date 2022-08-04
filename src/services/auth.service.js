import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/";

// const register = (username, firstname, password, lastname, mailAddress) => {
//     return axios.post(API_URL + "register", {
//         username,
//         firstname,
//         lastname,
//         mailAddress,
//         password
//     });
// };

const login = (email, password) => {
    return axios
        .post(API_URL + "login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                console.log(response.data)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.accessToken)
                console.log(response.data)
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
};

const authService = {
    // register,
    login,
    logout,
};

export default authService;