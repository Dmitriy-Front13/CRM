import { ProjectForm } from "@/components/projects/projects-form";
import { getProjectById } from "@/actions/projects/actions";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;

  if (projectId === "new")
    return (
      <div className="container mx-auto py-10 px-4">
        <ProjectForm />
      </div>
    );
  const project = await getProjectById(Number(projectId));
  return (
    <div className="container mx-auto py-10 px-4">
      <ProjectForm project={project} />
    </div>
  );
}
