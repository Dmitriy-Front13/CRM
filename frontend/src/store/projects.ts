import { create } from 'zustand';
import { getAllProjects, createProject, updateProject, deleteProject } from '../services/projects';

interface ProjectStore {
  projects: any[];
  setProjects: (data: any) => void;
  fetchProjects: () => Promise<void>;
  addProject: (projectData: any) => Promise<void>;
  updateProject: (id: any, projectData: any) => Promise<void>;
  deleteProject: (id: any) => Promise<void>;
}

const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  setProjects: (data: any) => set({ projects: data }),

  // Получение всех проектов
  fetchProjects: async () => {
    try {
      const data = await getAllProjects();
      set({ projects: data || [] });
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  },

  // Создание нового проекта
  addProject: async (projectData: any) => {
    try {
      const newProject = await createProject(projectData);
      set((state: { projects: any; }) => ({ projects: [...state.projects, newProject] }));
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  },

  // Обновление проекта
  updateProject: async (id: any, projectData: any) => {
    try {
      const updatedProject = await updateProject(id, projectData);
      set((state: { projects: any[]; }) => ({
        projects: state.projects.map((proj: { id: any; }) =>
          proj.id === id ? updatedProject : proj
        ),
      }));
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  },

  // Удаление проекта
  deleteProject: async (id: any) => {
    try {
      await deleteProject(id);
      set((state: { projects: any[]; }) => ({
        projects: state.projects.filter((proj: { id: any; }) => proj.id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  },
}));

export default useProjectStore;
