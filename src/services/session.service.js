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
    console.log(startHour, startMinute, seanceDuration, day, emploiId, teacherId, agentId, matiereId, salleId)
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

const sessionService = {
    getAllSessions,
    createSession
};

export default sessionService;