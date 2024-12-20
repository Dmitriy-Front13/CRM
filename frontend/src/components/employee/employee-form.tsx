"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../ui/submit-button";
import { BackButton } from "../ui/back-button";
import useEmployeeStore from "@/store/employees";
import useCommonStore from "@/store/common";
import { useProjects } from "@/hooks/useProjects";
import { Employee } from "@prisma/client";
import { Button } from "../ui/button";
import Link from "next/link";

type EmployeeWithProjects = Employee & {
  projects: string[];
};

interface EmployeeFormProps {
  employee?: EmployeeWithProjects;
}

export function EmployeeForm({ employee }: EmployeeFormProps) {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [subdivision, setSubdivision] = useState("");
  const [position, setPosition] = useState("");
  const [outOfOfficeBalance, setOutOfOfficeBalance] = useState("");
  const [project, setProject] = useState<string[]>([]);
  const [peoplePartner, setPeoplePartner] = useState("");
  const [role, setRole] = useState<string[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);

  const { addEmployee, updateEmployee } = useEmployeeStore();
  const { projects } = useProjects();
  const { positions, subdivisions, roles, statusChoices } = useCommonStore();
  const router = useRouter();

  useEffect(() => {
    if (employee) {
      setFullName(employee.fullName);
      setPassword(employee.password || "");
      setStatus(employee.status);
      setSubdivision(employee.subdivision);
      setPosition(employee.position);
      setOutOfOfficeBalance(employee.outOfOfficeBalance.toString());
      setProject(employee.projects);
      setPeoplePartner(employee.peoplePartner);
    }
  }, [employee]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      fullName,
      password,
      status,
      peoplePartner,
      position,
      roles: role,
      subdivision,
      projects: project,
      outOfOfficeBalance: Number(outOfOfficeBalance),
      photo,
    };

    try {
      if (employee) {
        await updateEmployee(employee.id, data);
      } else {
        await addEmployee(data);
      }
      router.push("/employees");
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-3xl">
      <div className="border p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-center text-2xl font-bold mb-6">
          {employee ? "Update Employee" : "Create New Employee"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status:
            </label>
            <select
              id="status"
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select status</option>
              {statusChoices.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="subdivision"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subdivision:
            </label>
            <select
              id="subdivision"
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={subdivision}
              onChange={(e) => setSubdivision(e.target.value)}
              required
            >
              <option value="">Select subdivision</option>
              {subdivisions.map((subdivision) => (
                <option key={subdivision} value={subdivision}>
                  {subdivision}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Position:
            </label>
            <select
              id="position"
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="">Select position</option>
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Role:
            </label>
            <select
              id="role"
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={role}
              onChange={(e) =>
                setRole(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              multiple
            >
              <option value="">Select role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="project"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Projects:
            </label>
            <select
              id="project"
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={project}
              onChange={(e) =>
                setProject(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              multiple
            >
              <option value="">Select project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.projectName}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="outOfOfficeBalance"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Out of Office Balance:
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="outOfOfficeBalance"
              value={outOfOfficeBalance}
              onChange={(e) => setOutOfOfficeBalance(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
            >
              {employee ? "Update Employee" : "Create Employee"}
            </Button>
          </div>
          <div className="flex justify-center mt-4">
            <Link href="/employees" className="btn-secondary">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
