import { EmployeeForm } from "@/components/employee/employee-form";
import {
  getAllPositions,
  getAllSubdivisions,
  getStatusChoices,
} from "@/services/common";
import { getEmployeeById, getPeoplePartners } from "@/services/employees";
import { getAllProjects } from "@/services/projects";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const employeeId = (await params).id;
  const [statuses, positions, subdivisions, projects, partners] =
    await Promise.all([
      getStatusChoices(),
      getAllPositions(),
      getAllSubdivisions(),
      getAllProjects(),
      getPeoplePartners(),
    ]);
  if (employeeId === "new")
    return (
      <div className="container mx-auto py-10 px-4">
        <EmployeeForm
          employeeInfo={{
            statuses,
            positions,
            subdivisions,
            projects,
            partners,
          }}
        />
      </div>
    );
  const employee = await getEmployeeById(Number(employeeId));
  return (
    <div className="container mx-auto py-10 px-4">
      <EmployeeForm
        employee={employee}
        employeeInfo={{ statuses, positions, subdivisions, projects, partners }}
      />
    </div>
  );
}
