import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/";

const getAllRooms = () => {
    return axios
        .get(API_URL + "salle")
        .then((response) => {
            return response.data
        })
}

const roomService = {
    getAllRooms,
};

export default roomService;