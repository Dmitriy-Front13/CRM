import prisma from "@prisma/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const body = await req.json();
    const { projects, ...data } = body;

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

    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: {
        ...data,
        projects: {
          set: [],
          connect: validProjectConnections,
        },
      },
      include: { projects: true },
    });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    return NextResponse.json({ message: error}, { status: 500 });
  }
}
