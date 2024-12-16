import prisma from '../../prisma/prisma.js';

// Заявки, связанные с определённым сотрудником
export const findByEmployee = async (employeeId) => {
  return await prisma.leaveRequest.findMany({
    where: { employeeId },
  });
};

// Список заявок со статусом 'Pending'
export const findPendingRequests = async () => {
  return await prisma.leaveRequest.findMany({
    where: { status: 'Pending' },
  });
};

// Поиск заявок за определённый период
export const findRequestsByDateRange = async (startDate, endDate) => {
  return await prisma.leaveRequest.findMany({
    where: {
      startDate: { gte: new Date(startDate) },
      endDate: { lte: new Date(endDate) },
    },
  });
};
