import prisma from '../../prisma/prisma.js';

// Получение всех активных сотрудников
export const findActiveEmployees = async () => {
  return await prisma.employee.findMany({
    where: { status: 'Active' },
  });
};

// Получение сотрудников по подразделению
export const findBySubdivision = async (subdivision) => {
  return await prisma.employee.findMany({
    where: { subdivision },
  });
};

// Получение сотрудника по имени
export const findByFullName = async (fullName) => {
  return await prisma.employee.findUnique({
    where: { fullName },
  });
};

export const findByPosition = async (position) => {
  return await prisma.employee.findMany({
    where: { position },
  });
};
