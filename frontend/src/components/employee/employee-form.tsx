"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

import { Employee, Project } from "@shared/types";
import { createEmployee, updateEmployee } from "@/services/employees";
import { Input } from "../ui/input";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  status: z.enum(["Active", "Inactive"]),
  subdivision: z.string(),
  position: z.string(),
  projects: z.array(z.string()).min(1, {
    message: "Please select at least one project.",
  }),
  outOfOfficeBalance: z.number().min(0),
  peoplePartner: z.string(),
});
export type EmployeeFormValues = z.infer<typeof formSchema>;

export interface EmployeeWithProjects extends Employee {
  projects: string[];
};
type EmployeeInfo = {
  statuses: StatusChoice;
  positions: Positions;
  subdivisions: Subdivisions;
  projects: Project[];
  partners: {fullName: string}[];
};
interface EmployeeFormProps {
  employee?: EmployeeWithProjects;
  employeeInfo: EmployeeInfo;
}

export function EmployeeForm({ employee, employeeInfo }: EmployeeFormProps) {
  const { positions, subdivisions, projects, partners } = employeeInfo;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialData = {
    fullName: employee?.fullName || "",
    password: employee?.password || "",
    status: employee?.status || "Inactive",
    subdivision: employee?.subdivision || "",
    position: employee?.position || "",
    projects: employee?.projects || [],
    outOfOfficeBalance: employee?.outOfOfficeBalance || 0,
    peoplePartner: employee?.peoplePartner || "",
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const router = useRouter();

  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      setIsLoading(true);
      setError(null)
      if (employee) {
        await updateEmployee(employee.id, data);
      } else {
        await createEmployee(data);
      }
      router.push("/employees");
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
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {employee ? "Edit Employee" : "Create New Employee"}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
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
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
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
              </div>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="subdivision"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subdivision</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                  name="outOfOfficeBalance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Out of Office Balance</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Separator className="my-6" />
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="projects"
                render={() => (
                  <FormItem>
                    <FormLabel>Projects</FormLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
                      {projects.map(({ projectName: project }) => (
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
                name="peoplePartner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>People Partner</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a People Partner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {partners.map((partner) => (
                          <SelectItem key={partner.fullName} value={partner.fullName}>
                            {partner.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/employees"> Back to Employee List </Link>
            <Button type="submit" disabled={isLoading}>
              {employee ? "Update Employee" : "Create Employee"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
