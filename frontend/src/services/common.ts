
import { axiosInstance } from "./instance";
export type StatusChoice = ["Active", "Inactive"];
export type Positions = ["HR_MANAGER", "PROJECT_MANAGER", "ADMINISTRATOR", "PROGRAMMER"];
export type Subdivisions = ["HR", "Finance", "Marketing", "Sales", "R&D", "IT"];

export const getStatusChoices = async (): Promise<StatusChoice> => {
    return (await axiosInstance.get<StatusChoice>("/project/status-choice")).data;
}

export const getAllRoles = async () => {
    return (await axiosInstance.get("/employees/roles")).data;
}

export const getAllPositions = async (): Promise<Positions> => {
    return (await axiosInstance.get<Positions>("/employees/positions")).data;
}

export const getAllSubdivisions = async (): Promise<Subdivisions> => {
    return (await axiosInstance.get<Subdivisions>("/employees/subdivisions")).data;
}



