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
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.accessToken)
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    axios.post(API_URL+"logout")
};

const forgotPassword = (email) => {
    return axios
        .post(API_URL + "reset_password", {
            email
        })
        .then((response) => {
            return response.data
        })
}

const resetPassword = (refreshToken,password,confirmPassword) => {
    return axios
        .post(API_URL + "reset_password/" + refreshToken , {
            password,
            confirmPassword
        })
        .then((response) => {
            return response.data
        })
}

const authService = {
    // register,
    login,
    logout,
    forgotPassword,
    resetPassword
};

export default authService;