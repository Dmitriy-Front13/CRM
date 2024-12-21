
import { EmployeeForm } from "@/components/employee/employee-form";
import { getAllPositions, getAllSubdivisions, getStatusChoices } from "@/services/common";
import { getAllProjects } from "@/services/projects";

export default async function NewEmployeePage() {
  const [statuses, positions, subdivisions, projects] = await Promise.all([
        getStatusChoices(),
        getAllPositions(),
        getAllSubdivisions(),
        getAllProjects()
      ]);
  return (
    <div className="container mx-auto py-10 px-4">
      <EmployeeForm employeeInfo={{ statuses, positions, subdivisions, projects }}/>
    </div>
  );
}
