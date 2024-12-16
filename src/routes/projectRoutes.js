import express from 'express';
import { projectValidationRules } from '../validators/projectValidator.js';
import  validate  from '../middleware/validateMiddleware.js';
import { STATUS_CHOICE, PROJECT_TYPES } from '../config/constants.js';
import csrf from 'csurf';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByStatus,
  getProjectsByManager,
} from '../controllers/projectController.js';

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Project ID
 *         projectName:
 *           type: string
 *           description: Name of the project
 *         projectType:
 *           type: string
 *           description: Type of the project (Internal/External)
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of the project
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get('/', getAllProjects);
router.get('/status-choice', (req, res) => {
  res.json(STATUS_CHOICE)});
router.get('/project-types', (req, res) => {
  res.json(PROJECT_TYPES)
})
router.get('/status/:status', getProjectsByStatus); // Проекты по статусу
router.get('/manager/:manager', getProjectsByManager); // Проекты по менеджеру
router.get('/:id', getProjectById); // Получение проекта по ID
router.post('/', csrfProtection, projectValidationRules, validate, createProject); // Создание нового проекта
router.put('/:id', csrfProtection, projectValidationRules, validate, updateProject); // Обновление проекта
router.delete('/:id', csrfProtection, deleteProject); // Удаление проекта

export default router;
