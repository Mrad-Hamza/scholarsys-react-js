import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/seance";

const getAllSessions = () => {
    return axios
        .get(API_URL + "/")
        .then((response) => {
            return response.data
        })
}

const createSession = (startHour,startMinute,seanceDuration,day,emploiId,teacherId,agentId,matiereId,salleId) => {
    
    return axios
        .post(API_URL+'/', {
            startHour,
            startMinute,
            seanceDuration,
            day,
            emploiId,
            teacherId,
            agentId,
            matiereId,
            salleId
        })
        .then((response) => {
            return response.data
        })
}

const getSessionById = (id) => {
    return axios
        .get(API_URL+"/"+id)
        .then((res)=> {
            return res.data
        })
}

const deleteSession = (id) => {
    return axios
        .delete(API_URL+"/"+id)
        .then((res)=> {return res.data})
}

const updateSession = (startHour, startMinute, seanceDuration, day, emploiId, teacherId, agentId, matiereId, salleId, id ) => {    
    return axios
        .patch(API_URL+'/'+id, {
            startHour,
            startMinute,
            seanceDuration,
            day,
            emploiId,
            teacherId,
            agentId,
            matiereId,
            salleId
        })
        .then((response) => {
            console.log(response)
            return response.data
        })
}

const sessionService = {
    getAllSessions,
    createSession,
    updateSession,
    deleteSession,
    getSessionById
};

export default sessionService;