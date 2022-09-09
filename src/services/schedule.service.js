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

const getOne = (id) => {
    return axios
        .get(API_URL+"/"+id)
        .then ((res) => {
            return res.data
        })
}

const generatePDF = () => {
    axios.get(API_URL+"/generate/students")
    axios.get(API_URL + "/generate/teachers")
}

const getScheduleByClassId = (id) => {
    return axios
        .get(API_URL+"/classe/"+id)
        .then(res=>{return res.data})
}

const scheduleService = {
    getAllSchedules,
    addSchedule,
    deleteSchedule,
    getOne,
    generatePDF,
    getScheduleByClassId,
};

export default scheduleService;