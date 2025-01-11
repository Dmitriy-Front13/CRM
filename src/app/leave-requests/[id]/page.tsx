import { encrypt } from "@/actions/auth/actions";
import { LeaveRequestsForm } from "@/components/leave-requests/leave-requests-form";

export default async function LeaveRequestPage() {
  const user = await encrypt();
  return (
    <div className="container mx-auto py-10 px-4">
      <LeaveRequestsForm user={user!} />
    </div>
  );
}
