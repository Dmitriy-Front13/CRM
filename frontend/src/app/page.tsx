import { EmployeeTable } from "@/components/employee/employee-table";
import { columns } from "@/components/employee/employee-table-column";
import { getAllEmployees } from "@/services/employees";
export default async function Home() {
  const data = await getAllEmployees();
  return (
    <div className="container mx-auto p-10">
      <EmployeeTable columns={columns} data={data} />
    </div>
  );
}
