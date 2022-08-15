import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/";

const getAllSubjects = () => {
    return axios
        .get(API_URL + "matiere")
        .then((response) => {
            return response.data
        })
}

const subjectService = {
    getAllSubjects,
};

export default subjectService;