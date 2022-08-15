import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/";

const getAllSchedules = () => {
    return axios
        .get(API_URL + "emploi/")
        .then((response) => {
            return response.data
        })
}

const scheduleService = {
    getAllSchedules,
};

export default scheduleService;