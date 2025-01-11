import { encrypt } from "@/actions/auth/actions";
import { getAllLeaveRequests, getLeaveRequestsForEmployee } from "@/actions/leave-requests/actions";
import { GenericTable } from "@/components/ui/generic-table";
import { LEAVE_REQUEST_STATUS, POSITIONS } from "@/constants";
import { LeaveRequest } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { columns } from "@/components/leave-requests/leave-requests-table-column";
import Link from "next/link";
const employeeFilters = [
  { columnId: "id", placeholder: "Search by ID", input: true },
  { columnId: "status", placeholder: "All statuses", options: LEAVE_REQUEST_STATUS }
];
export default async function LeaveRequestsPage() {
  const user = await encrypt();
  let data: LeaveRequest[];
  if (user!.position === POSITIONS.EMPLOYEE) {
    data = await getLeaveRequestsForEmployee(user!.fullName);
    return (
      <div className="container mx-auto px-10">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-2xl font-bold">Leave Requests</h1>
          <Link
            href="/leave-requests/new"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Leave Request
          </Link>
        </div>
        <GenericTable
          columns={columns}
          data={data}
          filters={employeeFilters}
        />
      </div>
    );
  } else {
    data = await getAllLeaveRequests();
    return (
      <div className="container mx-auto px-10">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-2xl font-bold">Leave Requests</h1>
        </div>
        <GenericTable
          columns={columns}
          data={data}
          filters={employeeFilters}
        />
      </div>
    );
  }
}
