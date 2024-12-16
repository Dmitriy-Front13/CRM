import { body } from 'express-validator';

export const leaveRequestValidationRules = [
  body('absenceReason').optional().isString().withMessage('Absence reason must be a string'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().withMessage('End date must be a valid date'),
  body('status')
    .isIn(['Pending', 'Approved'])
    .withMessage('Status must be either Pending or Approved'),
];
