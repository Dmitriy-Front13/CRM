"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "@/actions/auth/actions";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLeaveRequest } from "@/actions/leave-requests/actions";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ABSENCE_REASON } from "@/constants";
import { DateRangePicker } from "../ui/data-range-picker";
interface LeaveRequestsFormProps {
  user: IUser;
}
const formSchema = z.object({
  employeeName: z.string(),
  comment: z.string().optional(),
  status: z.string(),
  startDate: z.date({ invalid_type_error: "Date is required." }),
  endDate: z.date({ invalid_type_error: "Date is required." }),
  absenceReason: z.string().min(1, {
    message: "Absence reason is required.",
  }),
});

export type LeaveRequestFormData = z.infer<typeof formSchema>;

export const LeaveRequestsForm = ({ user }: LeaveRequestsFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const initialData = {
    employeeName: user.fullName,
    comment: "",
    status: "New",
    absenceReason: "",
    startDate: null as unknown as Date,
    endDate: null as unknown as Date,
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  console.log(form.formState.errors);
  async function onSubmit(data: LeaveRequestFormData) {
    try {
      setIsLoading(true);
      setError(null);
      await createLeaveRequest({ ...data, status: "Submitted" });
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
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Create New Leave Request
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
                name="absenceReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Absence Reason</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a absence reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ABSENCE_REASON).map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="flex flex-col">
                <FormLabel>Leave Period</FormLabel>
                <DateRangePicker
                  control={form.control}
                  startFieldName="startDate"
                  endFieldName="endDate"
                />
                <FormMessage>
                  {form.formState.errors.startDate?.message ||
                    form.formState.errors.endDate?.message}
                </FormMessage>
              </FormItem>
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
            <Link href="/leave-requests">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              Submit Leave Request
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
