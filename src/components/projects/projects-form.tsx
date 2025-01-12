"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { Project } from "@prisma/client";
import { PROJECT_TYPES } from "@/constants";
import { createProject, updateProject } from "@/actions/projects/actions";

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project Name must be at least 2 characters.",
  }),
  projectType: z.string().min(1, {
    message: "Project Type is required.",
  }),
  status: z.string(),
  comment: z.string().nullable(),
  startDate: z.date(),
  endDate: z.date().nullable(),
  projectManager: z.string()
});

export type FormData = z.infer<typeof formSchema>;
interface ProjectFormProps {
  project?: Project;
  projectManager: string
}
export function ProjectForm({ project, projectManager }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialData: FormData = {
    projectName: project?.projectName || "",
    projectType: project?.projectType || "",
    status: project?.status || "Active",
    comment: project?.comment || null,
    startDate: project?.startDate || new Date(),
    endDate: project?.endDate || null,
    projectManager: project?.projectManager || projectManager
  };


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);
      if (project) {
        await await updateProject(project.id, { ...data })
      } else {
        await createProject(data);
      }
      router.push("/projects");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {project ? "Edit Project" : "Create New Project"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(PROJECT_TYPES).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Status</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value === "Active"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "Active" : "Inactive")
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional comments here"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/projects">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {project ? "Update Project" : "Create Project"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
