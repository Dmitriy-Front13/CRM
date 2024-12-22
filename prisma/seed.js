import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function down() {
  console.log('Clearing the database...');
  await prisma.$executeRaw`TRUNCATE TABLE "Employee" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Project" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "LeaveRequest" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ApprovalRequest" RESTART IDENTITY CASCADE;`;
  console.log('Database cleared!');
}

async function main() {
  // Очищаем таблицы
  await down();

  console.log('Seeding the database...');

  // Сидинг сотрудников
  await prisma.employee.createMany({
    data: [
      {
        fullName: 'John Doe',
        password: 'securepassword',
        subdivision: 'IT',
        position: 'Developer',
        status: 'Active',
        peoplePartner: 'Jane Smith',
        outOfOfficeBalance: 5,
      },
      {
        fullName: 'Alice Johnson',
        password: 'securepassword',
        subdivision: 'HR',
        position: 'HR_MANAGER',
        status: 'Active',
        peoplePartner: 'John Doe',
        outOfOfficeBalance: 10,
      },
    ],
  });

  // Сидинг проектов
  await prisma.project.createMany({
    data: [
      {
        projectType: 'Internal',
        startDate: new Date('2023-01-01'),
        status: 'Active',
        projectName: 'CRM System',
        projectManager: 'John Doe',
      },
      {
        projectType: 'External',
        startDate: new Date('2023-06-01'),
        status: 'Completed',
        projectName: 'E-commerce Platform',
        projectManager: 'Alice Johnson',
      },
    ],
  });

  // Сидинг заявок на отпуск
  await prisma.leaveRequest.createMany({
    data: [
      {
        employeeId: 1,
        absenceReason: 'Vacation',
        startDate: new Date('2023-07-01'),
        endDate: new Date('2023-07-15'),
        status: 'Approved',
        name: 'John Doe Vacation',
      },
      {
        employeeId: 2,
        absenceReason: 'Sick Leave',
        startDate: new Date('2023-08-01'),
        endDate: new Date('2023-08-05'),
        status: 'Pending',
        name: 'Alice Johnson Sick Leave',
      },
    ],
  });

  // Сидинг запросов на утверждение
  await prisma.approvalRequest.createMany({
    data: [
      {
        approver: 'Jane Smith',
        leaveRequest: 'John Doe Vacation',
        status: 'Approved',
        comment: 'Looks good!',
      },
      {
        approver: 'John Doe',
        leaveRequest: 'Alice Johnson Sick Leave',
        status: 'Pending',
        comment: null,
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
