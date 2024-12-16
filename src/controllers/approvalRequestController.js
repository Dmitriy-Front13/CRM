import prisma from '../../prisma/prisma.js';
import {
  findPendingApprovals,
  findByApprover,
} from '../repositories/approvalRequestRepository.js'
// Получение всех запросов
export const getAllApprovalRequests = async (req, res) => {
  try {
    const approvalRequests = await prisma.approvalRequest.findMany();
    res.json(approvalRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение запроса по ID
export const getApprovalRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const approvalRequest = await prisma.approvalRequest.findUnique({ where: { id: Number(id) } });

    if (!approvalRequest) {
      return res.status(404).json({ message: 'Approval request not found' });
    }

    res.json(approvalRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создание нового запроса
export const createApprovalRequest = async (req, res) => {
  try {
    const { approver, leaveRequest, status, comment } = req.body;

    const newApprovalRequest = await prisma.approvalRequest.create({
      data: {
        approver,
        leaveRequest,
        status,
        comment,
      },
    });

    res.status(201).json(newApprovalRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновление запроса
export const updateApprovalRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedApprovalRequest = await prisma.approvalRequest.update({
      where: { id: Number(id) },
      data,
    });

    res.json(updatedApprovalRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление запроса
export const deleteApprovalRequest = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.approvalRequest.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPendingApprovals = async (req, res) => {
  try {
    const approvals = await findPendingApprovals();
    res.json(approvals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение запросов по утверждающему
export const getApprovalsByApprover = async (req, res) => {
  const { approver } = req.params;
  try {
    const approvals = await findByApprover(approver);
    res.json(approvals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};