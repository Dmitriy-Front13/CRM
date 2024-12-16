"use client";
import { useParams } from "next/navigation";
import { EmployeeForm } from "@/components/employee/employee-form";
import { useEmployees } from "@/hooks/useEmployees";

export default function EditEmployeePage() {
  const { id } = useParams();
  const { employees } = useEmployees();
  const employee = employees.find((e) => e.id === parseInt(id as string, 10));

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="container mx-auto">
      <EmployeeForm employeeId={employee.id} />
    </div>
  );
}
