import axios from "axios"
const url = "http://localhost:8080/cabs";
export const getCabs = () => axios.get("http://localhost:8080/cabs/all");
export const getDrivers = () => axios.get("http://localhost:8080/driver/all");
export const addCab = async (cab) => {
    const response = await axios.post("http://localhost:8080/cabs", cab);
    return response.data;
}
export const getCabLocations = async () => {
    const response = await axios.get("http://localhost:8080/cabs/location");
    return response.data;
}