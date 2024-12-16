import prisma from '../../prisma/prisma.js';

import {
  findByStatus,
  findByManager,
  findProjectsByDateRange,
} from '../repositories/projectRepository.js';
// Получение всех проектов
export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение проекта по ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({ where: { id: Number(id) } });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создание нового проекта
export const createProject = async (req, res) => {
  try {
    const { projectType, startDate, endDate, comment, status, projectName, projectManager } = req.body;

    const newProject = await prisma.project.create({
      data: {
        projectType,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        comment,
        status,
        projectName,
        projectManager,
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновление проекта
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data,
    });

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление проекта
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjectsByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const projects = await findByStatus(status);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение проектов по менеджеру
export const getProjectsByManager = async (req, res) => {
  const { manager } = req.params;
  try {
    const projects = await findByManager(manager);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение проектов за период
export const getProjectsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const projects = await findProjectsByDateRange(startDate, endDate);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};