"use client";
import { Filter } from "../ui/filter";
import { Search } from "../ui/search";
import { useState, useEffect, useMemo } from "react";
import { useCommon } from "../../hooks/useCommon";

interface EmployeesFilterMenuProps {
  renderEmployees: any[];
  setFilteredEmployees: (employees: any[]) => void;
}

export function EmployeeFilterMenu({
  renderEmployees,
  setFilteredEmployees,
}: EmployeesFilterMenuProps) {
  const { statusChoices, positions, subdivisions } = useCommon();

  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedStatus: "",
    selectedPosition: "",
    selectedSubdivision: "",
    selectedHrManager: "",
  });

  // Memoized HR Managers
  const HrManagers = useMemo(
    () =>
      renderEmployees
        ?.filter((employee) => employee?.position === "HR_MANAGER")
        .map((manager) => manager.fullName) || [],
    [renderEmployees]
  );

  const filterEmployees = () => {
    let filteredEmployees = [...(renderEmployees || [])];

    if (filters.searchTerm) {
      filteredEmployees = filteredEmployees.filter((employee) =>
        employee.fullName
          ?.toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
      );
    }
    if (filters.selectedStatus) {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.status === filters.selectedStatus
      );
    }
    if (filters.selectedPosition) {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.position === filters.selectedPosition
      );
    }
    if (filters.selectedSubdivision) {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.subdivision === filters.selectedSubdivision
      );
    }
    if (filters.selectedHrManager) {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.peoplePartner === filters.selectedHrManager
      );
    }

    setFilteredEmployees(filteredEmployees);
  };

  useEffect(() => {
    filterEmployees();
  }, [filters, renderEmployees]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <>
      <Search
        listData={renderEmployees || []}
        searchTerm={filters.searchTerm}
        setSearchTerm={(value) => handleFilterChange("searchTerm", value)}
        className="border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={"Search by Name"}
      />
      <Filter
        availableOptions={statusChoices || []}
        selectedValue={filters.selectedStatus}
        onChange={(event) =>
          handleFilterChange("selectedStatus", event.target.value)
        }
        placeholder="All statuses"
      />
      <Filter
        availableOptions={positions || []}
        selectedValue={filters.selectedPosition}
        onChange={(event) =>
          handleFilterChange("selectedPosition", event.target.value)
        }
        placeholder="All positions"
      />
      <Filter
        availableOptions={subdivisions || []}
        selectedValue={filters.selectedSubdivision}
        onChange={(event) =>
          handleFilterChange("selectedSubdivision", event.target.value)
        }
        placeholder="All subdivisions"
      />
      <Filter
        availableOptions={HrManagers}
        selectedValue={filters.selectedHrManager}
        onChange={(event) =>
          handleFilterChange("selectedHrManager", event.target.value)
        }
        placeholder="All people partner"
      />
    </>
  );
}
