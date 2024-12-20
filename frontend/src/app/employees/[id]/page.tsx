import { EmployeeForm } from "@/components/employee/employee-form";
import { getEmployeeById } from "@/services/employees";


export default async function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const employeeId = (await params).id;
  const employee = await getEmployeeById(Number(employeeId));
  return (
    <div className="container mx-auto">
      <EmployeeForm employee={employee} />
    </div>
  );
}
