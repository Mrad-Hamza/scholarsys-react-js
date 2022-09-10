import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/attendance";

const getAllBySessionId = (id) => {
    return axios
        .get(API_URL + "/getBySeancesId/" + id)
        .then((response) => {
            return response.data
        })
}

const createAttendance = (state, seanceId, studentId) => {
    console.log("lol")
    return axios
        .post(API_URL + "/", {
            seanceId,
            studentId,
            state
        })
        .then((res) => {
            return res.data
        })
}

const updateAttendance = (id, seanceId, studentId, state) => {
    return axios
        .patch(API_URL + "/" + id, {
            seanceId,
            studentId,
            state
        })
        .then((res) => {
            return res.data
        })
}

const getOneBySeanceIdAndStudentId = (seanceId, studentId) => {
    return axios
        .get(API_URL + "/getOneBySeancesIdAndStudentId/" + seanceId + "/" + studentId)
        .then((res) => {
            return res.data 
        })
}

const attendanceService = {
    getAllBySessionId,
    getOneBySeanceIdAndStudentId,
    createAttendance,
    updateAttendance
};

export default attendanceService;