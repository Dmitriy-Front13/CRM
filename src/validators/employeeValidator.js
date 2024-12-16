import { body } from 'express-validator';

export const employeeValidationRules = [
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required')
    .isString()
    .withMessage('Full name must be a string'),
  body('roles')
    .isArray()
    .withMessage('Roles must be an array'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('status')
    .isIn(['Active', 'Inactive'])
    .withMessage('Status must be either Active or Inactive'),
];
