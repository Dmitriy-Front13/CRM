import { EmployeeForm } from "@/components/employee/employee-form";

import { getEmployeeById, getPeoplePartners } from "@/services/employees";
import { getAllProjects, getProjectsByPM, getProjectsByEmployee } from "@/actions/projects/actions";
import { encrypt } from "@/actions";
import { POSITIONS } from "@/constants";
import { redirect } from "next/navigation";
import { Project } from "@prisma/client";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const employeeId = (await params).id;
  const user = await encrypt();
  let projectPromise: Promise<Project[]>
  switch (user!.position) {
    case POSITIONS.PROJECT_MANAGER:
      projectPromise = getProjectsByPM(user!.fullName)
      break;
    case POSITIONS.HR_MANAGER:
      projectPromise = getProjectsByEmployee(employeeId)
      break;
    default:
      projectPromise = getAllProjects()
      break;
  }
  const [projects, partners] = await Promise.all([
    projectPromise,
    getPeoplePartners(),
  ]);
  if (employeeId === "new") {
    if (user?.position === POSITIONS.PROJECT_MANAGER) redirect("/employees");
    return (
      <div className="container mx-auto py-10 px-4">
        <EmployeeForm
          employeeInfo={{
            projects,
            partners,
          }}
          user={user!}
        />
      </div>
    );
  }
  const employee = await getEmployeeById(Number(employeeId));
  return (
    <div className="container mx-auto py-10 px-4">
      <EmployeeForm employee={employee} employeeInfo={{ projects, partners }} user={user!} />
    </div>
  );
}
