import { EmployeeTable } from "@/components/employee/employee-table";
import { columns } from "@/components/employee/employee-table-column";
import { getAllPositions, getAllSubdivisions, getStatusChoices } from "@/services/common";
import { getAllEmployees } from "@/services/employees";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
export default async function Home() {
  const data = await getAllEmployees();
  const [statuses, positions, subdivisions] = await Promise.all([
    getStatusChoices(),
    getAllPositions(),
    getAllSubdivisions()
  ]);
  return (
    <div className="container mx-auto px-10">
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Link 
          href="/employees/new" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Employee
        </Link>
      </div>
      <EmployeeTable columns={columns} data={data} filterOptions={{
        statuses,
        positions,
        subdivisions,
      }}/>
    </div>
  );
}
