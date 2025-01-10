import { EmployeeForm } from "@/components/employee/employee-form";

import { getEmployeeById, getPeoplePartners } from "@/services/employees";
import { getAllProjects } from "@/actions/projects/actions";
import { encrypt } from "@/actions";
import { POSITIONS } from "@/constants";
import { redirect } from "next/navigation";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const employeeId = (await params).id;
  const [projects, partners] = await Promise.all([
    getAllProjects(),
    getPeoplePartners(),
  ]);
  const user = await encrypt();
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
