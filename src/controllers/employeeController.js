import prisma from '../../prisma/prisma.js';
import {
  findActiveEmployees,
  findBySubdivision,
  findByFullName,
  findByPosition
} from '../repositories/employeeRepository.js';

// Получение всех сотрудников
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        projects: {
          select: {
            projectName: true
          }
        }
      }
    });

    // Преобразуем данные, чтобы проекты были представлены только массивом имен
    const simplifiedEmployees = employees.map(employee => ({
      ...employee,
      projects: employee.projects.map(project => project.projectName)
    }));

    res.json(simplifiedEmployees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение сотрудника по ID
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({ where: { id: Number(id) } });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создание нового сотрудника
export const createEmployee = async (req, res) => {
  try {
    const { 
      fullName, 
      roles, 
      password, 
      subdivision, 
      position, 
      status, 
      peoplePartner, 
      outOfOfficeBalance, 
      photo,
      projects // массив имен проектов
    } = req.body;

    // Сначала находим все проекты по их именам
    const projectConnections = projects?.length 
      ? await Promise.all(
          projects.map(async (projectName) => {
            const project = await prisma.project.findFirst({
              where: { projectName }
            });
            return project ? { id: project.id } : null;
          })
        )
      : [];

    // Фильтруем null значения (проекты, которые не были найдены)
    const validProjectConnections = projectConnections.filter(p => p !== null);

    const newEmployee = await prisma.employee.create({
      data: {
        fullName,
        roles,
        password,
        subdivision,
        position,
        status,
        peoplePartner,
        outOfOfficeBalance,
        photo,
        projects: {
          connect: validProjectConnections
        }
      },
      include: {
        projects: true
      }
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { projects, ...data } = req.body;

    // Находим проекты по именам
    const projectConnections = projects?.length 
      ? await Promise.all(
          projects.map(async (projectName) => {
            const project = await prisma.project.findFirst({
              where: { projectName }
            });
            return project ? { id: project.id } : null;
          })
        )
      : [];

    // Фильтруем null значения
    const validProjectConnections = projectConnections.filter(p => p !== null);

    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: {
        ...data,
        projects: {
          set: [], // Очищаем старые связи
          connect: validProjectConnections // Устанавливаем новые
        }
      },
      include: {
        projects: true
      }
    });

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление сотрудника
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getActiveEmployees = async (req, res) => {
  try {
    const employees = await findActiveEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение сотрудников по подразделению
export const getEmployeesBySubdivision = async (req, res) => {
  const { subdivision } = req.params;
  try {
    const employees = await findBySubdivision(subdivision);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Поиск сотрудника по имени
export const getEmployeeByFullName = async (req, res) => {
  const { fullName } = req.params;
  try {
    const employee = await findByFullName(fullName);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeesByPosition = async (req, res) => { 
  const { position } = req.params;
  try {
    const employees = await findByPosition(position);
    if (!employees) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};