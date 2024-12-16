import { body } from 'express-validator';

export const approvalRequestValidationRules = [
  body('approver').notEmpty().withMessage('Approver is required'),
  body('status')
    .isIn(['Pending', 'Approved', 'Rejected'])
    .withMessage('Status must be either Pending, Approved, or Rejected'),
  body('comment').optional().isString().withMessage('Comment must be a string'),
];
