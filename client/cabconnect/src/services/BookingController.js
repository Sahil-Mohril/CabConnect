import axios from "axios";
const url = "http://localhost:8080/booking";

export const getCurrentBooking = async () => {
    const response = await axios.get(url + "/504/current");
    return response.data;
}
// export const hello = async () => {
//     const response = await axios.post(url + "/hello");
//     return response.data;
// }
export const hello = async () => {
    const response = await axios.post(url + "/hello");
    return response.data;
};
export const postBookingDTO = async (bookingDTO) => {
    const response = await axios.post(url + "/DTO", bookingDTO);
    return response.data;
}