
import SortButton from "../ui/sort-button";

interface EmployeeTableHeadProps {
  onSort: (key: string) => void;
}

export function EmployeeTableHead({ onSort }: EmployeeTableHeadProps) {
  
  return (
    <thead className="thead-dark">
      <tr className="text-center">
        <th>
          <SortButton name={"ID"} handleSort={onSort} data={"id"} />
        </th>
        <th>
          <SortButton
            name={"fullName"}
            handleSort={onSort}
            data={"fullName"}
          />
        </th>
        <th>
          <SortButton name={"Status"} handleSort={onSort} data={"status"} />
        </th>
        <th>
          <SortButton
            name={"PeoplePartner"}
            handleSort={onSort}
            data={"peoplePartner"}
          />
        </th>
        <th>
          <SortButton
            name={"Position"}
            handleSort={onSort}
            data={"position"}
          />
        </th>
        <th className="align-middle mt-2">Role</th>
        <th>
          <SortButton
            name={"Subdivision"}
            handleSort={onSort}
            data={"subdivision"}
          />
        </th>
        <th className="align-middle mt-2">Projects</th>
        <th>
          <SortButton
            name={"OutOfOfficeBalance"}
            handleSort={onSort}
            data={"outOfOfficeBalance"}
          />
        </th>
        <th className="align-middle mt-2">Actions</th>
      </tr>
    </thead>
  );
}
