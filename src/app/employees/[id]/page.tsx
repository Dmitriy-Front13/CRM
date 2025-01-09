import { EmployeeForm } from "@/components/employee/employee-form";
import { getEmployeeById, getPeoplePartners } from "@/services/employees";
import { getAllProjects } from "@/actions/projects/actions";
import { POSITIONS } from "@/constants";
import { encrypt } from "@/actions";
import { redirect } from "next/navigation";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const employeeId = (await params).id;

  // Получение данных
  const [projects, partners] = await Promise.all([
    getAllProjects(),
    getPeoplePartners(),
  ]);

  // Проверка на новый сотрудник
  if (employeeId === "new") {
    const user = await encrypt();
    if (user!.position === POSITIONS.PROJECT_MANAGER) {
      redirect("/employees");
      return null; // Завершаем выполнение
    }

    return (
      <div className="container mx-auto py-10 px-4">
        <EmployeeForm employeeInfo={{ projects, partners }} />
      </div>
    );
  }

  // Получение данных о сотруднике
  const employee = await getEmployeeById(Number(employeeId));

  return (
    <div className="container mx-auto py-10 px-4">
      <EmployeeForm employee={employee} employeeInfo={{ projects, partners }} />
    </div>
  );
}
