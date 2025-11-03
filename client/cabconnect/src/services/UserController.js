import axios from "axios";
const url = "http://localhost:8080/user"
const id = 503;
export const getUserLocation = async (userId) => {
    const response = await axios.get("http://localhost:8080/user/" + userId + "/location");
    return response.data;
}