import { DeleteButton } from "../ui/delete-button";
import { UpdateButton } from "../ui/update-button";
import useEmployeeStore from "@/store/employees";
import { EmployeeTableHead } from "./employee-table-head";
interface RenderEmployeesProps {
  filteredEmployees: any[];
  onEdit: (id: number) => void
  onSort: (key: string) => void;
}

export function EmployeesList({
  filteredEmployees,
  onEdit,
  onSort,
}: RenderEmployeesProps) {
  const { deleteEmployee } = useEmployeeStore();

  return (
    <table className="table-bordered-hover">
      <EmployeeTableHead onSort={onSort} />
      <tbody>
        {filteredEmployees.map((employee) => (
          <tr key={employee.id} className="text-center">
            <td>{employee.id}</td>
            <td>{employee.fullName}</td>
            <td>{employee.status}</td>
            <td>{employee.peoplePartner}</td>
            <td>{employee.position}</td>
            <td>{employee.roles.join(", ")}</td>
            <td>{employee.subdivision}</td>
            <td>
              {employee.projects.length > 0
                ? employee.projects.join(", ")
                : "No projects assigned"}
            </td>
            <td>{employee.outOfOfficeBalance}</td>
            <td className="p-2">
              <div className="flex justify-center">
                <UpdateButton
                  name={"Update"}
                  data={employee.id}
                  onEdit={onEdit}
                />
                <DeleteButton
                  name={"Delete"}
                  handleDelete={deleteEmployee}
                  data={employee.id}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
