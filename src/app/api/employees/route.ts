import { NextResponse } from 'next/server';
import prisma from '@prisma/prisma';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      password,
      subdivision,
      position,
      status,
      peoplePartner,
      outOfOfficeBalance,
      photo,
      projects,
    } = body;

    const projectConnections = projects?.length
      ? await Promise.all(
          projects.map(async (projectName: string) => {
            const project = await prisma.project.findFirst({
              where: { projectName },
            });
            return project ? { id: project.id } : null;
          }),
        )
      : [];

    const validProjectConnections = projectConnections.filter(p => p !== null);

    const newEmployee = await prisma.employee.create({
      data: {
        fullName,
        password,
        subdivision,
        position,
        status,
        peoplePartner,
        outOfOfficeBalance,
        photo,
        projects: { connect: validProjectConnections },
      },
      include: { projects: true },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    return NextResponse.json({ massage: error }, { status: 500 });
  }
}
