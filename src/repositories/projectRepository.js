import prisma from '../../prisma/prisma.js';

// Получение проектов с определённым статусом
export const findByStatus = async (status) => {
  return await prisma.project.findMany({
    where: { status },
  });
};

// Проекты, связанные с определённым менеджером
export const findByManager = async (manager) => {
  return await prisma.project.findMany({
    where: { projectManager: manager },
  });
};

// Проекты за определённый период
export const findProjectsByDateRange = async (startDate, endDate) => {
  return await prisma.project.findMany({
    where: {
      startDate: { gte: new Date(startDate) },
      endDate: { lte: new Date(endDate) },
    },
  });
};
