import axios from "axios";
const url = "http://localhost:8080/booking";

export const getCurrentBooking = async () => {
    const response = await axios.get(url + "/504/current");
    return response.data;
}