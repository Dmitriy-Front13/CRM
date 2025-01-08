import { ProjectForm } from "@/components/projects/projects-form";
import { getEmployeeById, getPeoplePartners } from "@/services/employees";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const projectId = (await params).id;
  
  if (employeeId === "new")
    return (
      <div className="container mx-auto py-10 px-4">
        <ProjectForm
          employeeInfo={{
            projects,
            partners,
          }}
        />
      </div>
    );
  const project = await getEmployeeById(Number(projectId));
  return (
    <div className="container mx-auto py-10 px-4">
      <ProjectForm
        employee={employee}
        employeeInfo={{ projects, partners }}
      />
    </div>
  );
}
