import prisma from './prisma';


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
        position: 'Employee',
        status: 'Active',
        peoplePartner: 'Jane Smith',
        outOfOfficeBalance: 5,
      },
      {
        fullName: 'Alice Johnson',
        password: 'securepassword',
        subdivision: 'HR',
        position: 'HR Manager',
        status: 'Active',
        peoplePartner: 'John Doe',
        outOfOfficeBalance: 10,
      },
      {
        fullName: 'Oleg Lanovoy',
        password: '12345678',
        subdivision: 'HR',
        position: 'Administrator',
        status: 'Active',
        peoplePartner: 'John Doe',
        outOfOfficeBalance: 10,
      },
      {
        fullName: 'PM',
        password: '12345678',
        subdivision: 'IT',
        position: 'Project Manager',
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
        projectType: 'Marketing Campaign',
        startDate: new Date('2023-01-01'),
        status: 'Active',
        projectName: 'CRM System',
        projectManager: 'PM',
      },
      {
        projectType: 'Software Development',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-12-31'),
        status: 'Completed',
        projectName: 'E-commerce Platform',
        projectManager: 'PM',
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
      },
      {
        employeeId: 2,
        absenceReason: 'Sick Leave',
        startDate: new Date('2023-08-01'),
        endDate: new Date('2023-08-05'),
        status: 'Submitted',
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
