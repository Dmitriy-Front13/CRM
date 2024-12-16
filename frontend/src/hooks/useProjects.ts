import { useEffect } from "react";
import useProjectStore from "../store/projects";

type ReturnProps = {
  projects: any[];
  fetchProjects: () => Promise<void>;
  addEmployee: (employeeData: any) => Promise<void>;
  updateProject: (id: number, employeeData: any) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
};
export const useProjects = () => {
  const projectState = useProjectStore((state) => state) as ReturnProps;
  useEffect(() => {
    projectState.fetchProjects();
  }, []);
  return projectState;
};