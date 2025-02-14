import { GenericTable } from "@/components/ui/generic-table";
import { columns } from "@/components/employee/employee-table-column";
import { getAllEmployees, getEmployeesForHR, getEmployeesForPM, updateEmployee } from "@/actions/employees/actions";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { POSITIONS, STATUS_CHOICE, SUBDIVISIONS } from "@/constants";
import { encrypt } from "@/actions/auth/actions";
import { EmployeeWithProjects } from "@/components/employee/employee-form";
import { redirect } from "next/navigation";

const employeeFilters = [
  { columnId: "fullName", placeholder: "Search by Name", input: true },
  { columnId: "status", placeholder: "All statuses", options: STATUS_CHOICE },
  { columnId: "position", placeholder: "All positions", options: POSITIONS },
  {
    columnId: "subdivision",
    placeholder: "All subdivisions",
    options: SUBDIVISIONS,
  },
];
export default async function Home() {
  const user = await encrypt();
  let data: EmployeeWithProjects[];
  switch (user!.position) {
    case POSITIONS.ADMINISTRATOR:
      data = await getAllEmployees();
      break;
    case POSITIONS.PROJECT_MANAGER:
      data = await getEmployeesForPM();
      break;
    case POSITIONS.HR_MANAGER:
      data = await getEmployeesForHR(user!.fullName);
      break;
    default:
      redirect("/");
  }

  return (
    <div className="container mx-auto px-10">
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        {user!.position !== POSITIONS.PROJECT_MANAGER && (
          <Link
            href="/employees/new"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Employee
          </Link>
        )}
      </div>
      <GenericTable
        columns={columns}
        data={data}
        filters={employeeFilters}
        updateEntity={updateEmployee}
      />
    </div>
  );
}
