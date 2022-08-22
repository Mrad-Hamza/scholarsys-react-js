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

const register = (firstname, lastname, phoneNumber, birthDate, image, email, password,role,salaire) => {
    var formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("phoneNumber", phoneNumber);
    formData.append("birthDate", birthDate);
    formData.append("image", image);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("salary",salaire)


    return axios
        .post(API_URL + "user/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log(response.data)
            return response.data
        })
}


const editUser = (id, firstname, lastname, email, password, birthDate, phoneNumber ,salaire) => {
    console.log(id, firstname, lastname, email, password, phoneNumber, birthDate, salaire)
    return axios
        .patch(API_URL + "user/" + id, {
            firstname,
            lastname,
            email,
            password,
            phoneNumber,
            birthDate,
            salaire
        })
        .then((response) => {
            return response.data
        })
}


const getTeachers = () => {
    const requestOptions = {
        method: "GET",
    };
    return axios.get(API_URL + "user/teachers", requestOptions);
};

const getStudents = () => {
    const requestOptions = {
        method: "GET",
    };
    return axios.get(API_URL + "user/students", requestOptions);
};

const getAgents = () => {
    const requestOptions = {
        method: "GET",
    };
    return axios.get(API_URL + "user/agents", requestOptions);
};



const userService = {
    register,
    getAllUsers,
    getUser,
    deleteUser,
    editUser,
    getTeachers,
    getStudents,
    getAgents,
    
    // getUserByMail,
};

export default userService