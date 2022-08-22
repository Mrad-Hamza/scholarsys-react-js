import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/emploi";

const getAllSchedules = () => {
    return axios
        .get(API_URL + "/")
        .then((response) => {
            return response.data
        })
}
const addSchedule = (name,agentId,classeId) => {
    return axios
        .post(API_URL + "/",{
            name,
            classeId,
            agentId
        })
        .then((res)=> {
            return res.data
        })
}

const deleteSchedule = (id) => {
    return axios
        .delete(API_URL+"/"+id)
        .then((res)=> {
            return res.data
        })
}

const scheduleService = {
    getAllSchedules,
    addSchedule,
    deleteSchedule
};

export default scheduleService;