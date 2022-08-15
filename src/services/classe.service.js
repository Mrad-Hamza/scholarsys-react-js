import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/";

const getAllClasses = () => {
    return axios
        .get(API_URL + "classes" )
        .then((response) => {
            return response.data
        })
}

const getById = (id) => {
    return axios
        .get(API_URL + "classes/"+id)
        .then((response) => {
            return response.data
        })
}

const classeService = {
    getAllClasses,
    getById
};

export default classeService;