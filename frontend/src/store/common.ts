import { create } from 'zustand';
import { getStatusChoices, getAllPositions, getAllSubdivisions, getAllRoles } from '../services/common';

interface CommonState {
  statusChoices: any[];
  positions: any[];
  subdivisions: any[];
  roles: any[];
  fetchCommonData: () => Promise<void>;
}

const useCommonStore = create<CommonState>((set) => ({
  statusChoices: [],
  positions: [],
  subdivisions: [],
  roles: [],

  // Получение всех данных
  fetchCommonData: async () => {
    try {
      const [statuses, positions, subdivisions, roles] = await Promise.all([
        getStatusChoices(),
        getAllPositions(),
        getAllSubdivisions(),
        getAllRoles(),
      ]);

      set({
        statusChoices: statuses || [],
        positions: positions || [],
        subdivisions: subdivisions || [],
        roles: roles || [],
      });
    } catch (error) {
      console.error('Failed to fetch common data:', error);
    }
  },
}));

export default useCommonStore;
