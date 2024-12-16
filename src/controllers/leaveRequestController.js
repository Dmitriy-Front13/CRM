import prisma from '../../prisma/prisma.js';
import {
  findByEmployee,
  findPendingRequests,
  findRequestsByDateRange,
} from '../repositories/leaveRequestRepository.js';
// Получение всех заявок
export const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany();
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение заявки по ID
export const getLeaveRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const leaveRequest = await prisma.leaveRequest.findUnique({ where: { id: Number(id) } });

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    res.json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создание новой заявки
export const createLeaveRequest = async (req, res) => {
  try {
    const { employeeId, absenceReason, startDate, endDate, comment, status, name, reviewerComment } = req.body;

    const newLeaveRequest = await prisma.leaveRequest.create({
      data: {
        employeeId,
        absenceReason,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        comment,
        status,
        name,
        reviewerComment,
      },
    });

    res.status(201).json(newLeaveRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновление заявки
export const updateLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedLeaveRequest = await prisma.leaveRequest.update({
      where: { id: Number(id) },
      data,
    });

    res.json(updatedLeaveRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление заявки
export const deleteLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.leaveRequest.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение заявок по сотруднику
export const getLeaveRequestsByEmployee = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const requests = await findByEmployee(employeeId);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение заявок со статусом 'Pending'
export const getPendingLeaveRequests = async (req, res) => {
  try {
    const requests = await findPendingRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Поиск заявок за период
export const getLeaveRequestsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const requests = await findRequestsByDateRange(startDate, endDate);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};