import { ProjectForm } from "@/components/projects/projects-form";
import { getProjectById } from "@/actions/projects/actions";
import { encrypt } from "@/actions/auth/actions";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const user = await encrypt();
  if (projectId === "new")
    return (
      <div className="container mx-auto py-10 px-4">
        <ProjectForm projectManager={user!.fullName}/>
      </div>
    );
  const project = await getProjectById(Number(projectId));
  return (
    <div className="container mx-auto py-10 px-4">
      <ProjectForm project={project} projectManager={user!.fullName}/>
    </div>
  );
}
