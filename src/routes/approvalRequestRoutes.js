import express from 'express';
import { validationResult } from 'express-validator';
import { approvalRequestValidationRules } from '../validators/approvalRequestValidator.js';
import {
  getAllApprovalRequests,
  getApprovalRequestById,
  createApprovalRequest,
  updateApprovalRequest,
  deleteApprovalRequest,
  getPendingApprovals,
  getApprovalsByApprover,
} from '../controllers/approvalRequestController.js';

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
 *     ApprovalRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Approval request ID
 *         approver:
 *           type: string
 *           description: Approver name
 *         status:
 *           type: string
 *           description: Status of the approval request
 */

/**
 * @swagger
 * /approval-requests:
 *   get:
 *     summary: Get all approval requests
 *     responses:
 *       200:
 *         description: A list of approval requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ApprovalRequest'
 */
router.get('/', getAllApprovalRequests);

router.get('/pending', getPendingApprovals); // Запросы со статусом 'Pending'
router.get('/approver/:approver', getApprovalsByApprover); // Запросы по утверждающему
router.get('/:id', getApprovalRequestById); // Получение запроса по ID
router.post('/', approvalRequestValidationRules, validate, createApprovalRequest); // Создание нового запроса
router.put('/:id', approvalRequestValidationRules, validate, updateApprovalRequest); // Обновление запроса
router.delete('/:id', deleteApprovalRequest); // Удаление запроса

export default router;
