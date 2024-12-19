import { DeleteButton } from "../ui/delete-button";
import { UpdateButton } from "../ui/update-button";
import useEmployeeStore from "@/store/employees";
import { EmployeeTableHead } from "./employee-table-head";

interface RenderEmployeesProps {
  filteredEmployees: any[];
  onEdit: (id: number) => void;
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
        {filteredEmployees?.map((employee, index) => (
          <tr key={employee?.id || index} className="text-center">
            <td>{employee?.id || "N/A"}</td>
            <td>{employee?.fullName || "N/A"}</td>
            <td>{employee?.status || "N/A"}</td>
            <td>{employee?.peoplePartner || "N/A"}</td>
            <td>{employee?.position || "N/A"}</td>
            <td>{employee?.roles?.join(", ") || "No roles assigned"}</td>
            <td>{employee?.subdivision || "N/A"}</td>
            <td>
              {employee?.projects?.length > 0
                ? employee.projects.join(", ")
                : "No projects assigned"}
            </td>
            <td>{employee?.outOfOfficeBalance || 0}</td>
            <td className="p-2">
              <div className="flex justify-center">
                <UpdateButton
                  name={"Update"}
                  data={employee?.id}
                  onEdit={onEdit}
                />
                <DeleteButton
                  name={"Delete"}
                  handleDelete={deleteEmployee}
                  data={employee?.id}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
