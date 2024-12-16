import express from 'express';
import { validationResult } from 'express-validator';
import { leaveRequestValidationRules } from '../validators/leaveRequestValidator.js';
import {
  getAllLeaveRequests,
  getLeaveRequestById,
  createLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest,
  getLeaveRequestsByEmployee,
  getPendingLeaveRequests,
  getLeaveRequestsByDateRange,
} from '../controllers/leaveRequestController.js';

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * @swagger
 * components:
 *   schemas:
 *     LeaveRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Leave request ID
 *         employeeId:
 *           type: integer
 *           description: ID of the employee requesting leave
 *         absenceReason:
 *           type: string
 *           description: Reason for absence
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of leave
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of leave
 */

/**
 * @swagger
 * /leave-requests:
 *   get:
 *     summary: Get all leave requests
 *     responses:
 *       200:
 *         description: A list of leave requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LeaveRequest'
 */
router.get('/', getAllLeaveRequests);

/**
 * @swagger
 * /leave-requests/{id}:
 *   get:
 *     summary: Get a leave request by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Leave request ID
 *     responses:
 *       200:
 *         description: Leave request details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeaveRequest'
 *       404:
 *         description: Leave request not found
 */
router.get('/:id', getLeaveRequestById);

router.get('/employee/:employeeId', getLeaveRequestsByEmployee); // Заявки по сотруднику
router.get('/pending', getPendingLeaveRequests); // Заявки со статусом 'Pending'
router.get('/date-range', getLeaveRequestsByDateRange); // Заявки за период
router.post('/', leaveRequestValidationRules, validate, createLeaveRequest); // Создание новой заявки
router.put('/:id', leaveRequestValidationRules, validate, updateLeaveRequest);// Обновление заявки
router.delete('/:id', deleteLeaveRequest); // Удаление заявки

export default router;
