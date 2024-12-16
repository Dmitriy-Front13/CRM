
import { axiosInstance } from "./instance";

export const getStatusChoices = async () => {
    return (await axiosInstance.get("/project/status-choice")).data;
}

export const getAllRoles = async () => {
    return (await axiosInstance.get("/employees/roles")).data;
}

export const getAllPositions = async () => {
    return (await axiosInstance.get("/employees/positions")).data;
}

export const getAllSubdivisions = async () => {
    return (await axiosInstance.get("/employees/subdivisions")).data;
}



