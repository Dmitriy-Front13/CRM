"use client";
import { CreateNewButton } from "@/components/ui/create-new-button";
import { EmployeeFilterMenu } from "@/components/employee/employee-filter-menu";
import { EmployeesList } from "@/components/employee/employees-list";
import { useEmployees } from "@/hooks/useEmployees";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
  const router = useRouter();
  const { employees } = useEmployees();

  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (employees) {
      const uniqueEmployees = employees
        .filter((employee) => employee && employee.id) // Проверяем, что элемент определен и содержит id
        .filter(
          (employee, index, self) =>
            self.findIndex((e) => e.id === employee.id) === index
        );
      setFilteredEmployees(uniqueEmployees);
    }
  }, [employees]);

  const handleSort = (key: string) => {
    const direction =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDirection(direction);

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredEmployees(sortedEmployees);
  };

  return (
    <>
      <h2 className="mt-3 mb-4 flex justify-center">Employees</h2>
      <div className="flex mb-3 gap-1">
        <EmployeeFilterMenu
          renderEmployees={employees}
          setFilteredEmployees={setFilteredEmployees}
        />
      </div>
      <EmployeesList
        filteredEmployees={filteredEmployees}
        onEdit={(id: any) => router.push(`/employees/${id}`)}
        onSort={handleSort}
      />
      <div className="flex justify-center mt-2 mb-4">
        <CreateNewButton onClick={() => router.push("/employees/new")} />
      </div>
    </>
  );
}
