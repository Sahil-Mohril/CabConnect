import axios from "axios";
const url = "http://localhost:8080/user"
const id = 503;
export const getUserLocation = async () => {
    const response = await axios.get("http://localhost:8080/user/503/location");
    return response.data;
}