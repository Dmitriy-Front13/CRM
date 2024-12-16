import { body } from 'express-validator';

export const projectValidationRules = [
  body('projectName').notEmpty().withMessage('Project name is required'),
  body('projectType')
    .isIn(['Internal', 'External'])
    .withMessage('Project type must be either Internal or External'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),
];
