import { updateProject } from "@/actions";
import { GenericTable } from "@/components/ui/generic-table";
import { getAllProjects } from "@/services/projects";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { columns } from "@/components/projects/projects-table-column";
import { PROJECT_STATUSES, PROJECT_TYPES } from "@/constants";
const projectsFilters = [
  { columnId: "projectName", placeholder: "Search by Name", input: true },
  { columnId: "status", placeholder: "All statuses", options: PROJECT_STATUSES},
  { columnId: "projectType", placeholder: "All types", options: PROJECT_TYPES },
]
export default async function Projects() {
  const data = await getAllProjects()
  return (
    <div className="container mx-auto px-10">
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href="/projects/new"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Project
        </Link>
      </div>
      <GenericTable columns={columns} data={data} filters={projectsFilters} updateEntity={updateProject}/>
    </div>
  )
}