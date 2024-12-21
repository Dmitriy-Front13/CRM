"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Positions, StatusChoice, Subdivisions } from "@/services/common";
import { Checkbox } from "@/components/ui/checkbox";

import { Employee, Project } from "@shared/types";
import { createEmployee } from "@/services/employees";
import { useState } from "react";
import { Input } from "../ui/input";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  subdivision: z.string(),
  position: z.string(),
  projects: z.array(z.string()).min(1, {
    message: "Please select at least one project.",
  }),
  outOfOfficeBalance: z.number().min(0),
});

type EmployeeWithProjects = Employee & {
  projects: string[];
};
type EmployeeInfo = {
  statuses: StatusChoice;
  positions: Positions;
  subdivisions: Subdivisions;
  projects: Project[];
};
interface EmployeeFormProps {
  employee?: EmployeeWithProjects;
  employeeInfo: EmployeeInfo;
}

export function EmployeeForm({ employee, employeeInfo }: EmployeeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { statuses, positions, subdivisions, projects } = employeeInfo;
  const initialData = {
    fullName: employee?.fullName || "",
    password: employee?.password || "",
    status: employee?.status || "Inactive",
    subdivision: employee?.subdivision || "",
    position: employee?.position || "",
    projects: employee?.projects || [],
    outOfOfficeBalance: employee?.outOfOfficeBalance || 0,
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await createEmployee(data);
      setIsLoading(false);
      router.push("/employees");
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Status</FormLabel>
                <FormDescription>
                  Set the employee status to active or inactive
                </FormDescription>
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
          name="subdivision"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subdivision</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subdivision" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subdivisions.map((subdivision) => (
                    <SelectItem key={subdivision} value={subdivision}>
                      {subdivision}
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
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
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
          name="projects"
          render={() => (
            <FormItem>
              <FormLabel>Projects</FormLabel>
              <div className="space-y-2">
                {projects.map(({projectName: project}) => (
                  <FormField
                    key={project}
                    control={form.control}
                    name="projects"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={project}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(project)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      project,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== project
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {project}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="outOfOfficeBalance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Out of Office Balance</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Employee"}
        </Button>
      </form>
    </Form>
  );
}
