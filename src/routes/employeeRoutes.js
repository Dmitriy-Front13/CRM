import express from 'express';
import { employeeValidationRules } from '../validators/employeeValidator.js';
import validate from '../middleware/validateMiddleware.js';
import csrf from 'csurf';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getActiveEmployees,
  getEmployeesBySubdivision,
  getEmployeeByFullName,
  getPeoplePartners,
} from '../controllers/employeeController.js';
import {
  POSITIONS,
  SUBDIVISIONS,
} from '../config/constants.js';

const router = express.Router();
const csrfProtection = csrf({ cookie: true });


/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Employee ID
 *         fullName:
 *           type: string
 *           description: Full name of the employee
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *           description: Roles assigned to the employee
 *         status:
 *           type: string
 *           description: Status of the employee (Active/Inactive)
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get('/', getAllEmployees);

/**
 * @swagger
 * /employees/active:
 *   get:
 *     summary: Get all active employees
 *     responses:
 *       200:
 *         description: A list of active employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get('/active', getActiveEmployees);
router.get('/positions', (req, res) => {
  res.json(POSITIONS);
});
router.get('/subdivisions', (req, res) => {
  res.json(SUBDIVISIONS);
});
router.get('/partners', getPeoplePartners)
/**
 * @swagger
 * /employees/subdivision/{subdivision}:
 *   get:
 *     summary: Get employees by subdivision
 *     parameters:
 *       - name: subdivision
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Subdivision name
 *     responses:
 *       200:
 *         description: A list of employees in the subdivision
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get('/subdivision/:subdivision', getEmployeesBySubdivision);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */
router.get('/:id', getEmployeeById);

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created
 */
router.post('/', csrfProtection, employeeValidationRules, validate, createEmployee);



router.get('/name/:fullName', getEmployeeByFullName); // Сотрудник по имени
router.put('/:id', csrfProtection, employeeValidationRules, validate, updateEmployee);
router.delete('/:id', csrfProtection, deleteEmployee); // Удаление сотрудника

export default router;