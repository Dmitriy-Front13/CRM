import prisma from '../../prisma/prisma.js';

// Запросы на утверждение со статусом 'Pending'
export const findPendingApprovals = async () => {
  return await prisma.approvalRequest.findMany({
    where: { status: 'Pending' },
  });
};

// Запросы, связанные с конкретным утверждающим
export const findByApprover = async (approver) => {
  return await prisma.approvalRequest.findMany({
    where: { approver },
  });
};
