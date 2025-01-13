import { encrypt } from "@/actions/auth/actions";
import { getOutOfBalanceEmployeeByName } from "@/actions/employees/actions";
import { LeaveRequestsForm } from "@/components/leave-requests/leave-requests-form";

export default async function LeaveRequestPage() {
  const user = await encrypt();
  const outOfOfficeBalance = await getOutOfBalanceEmployeeByName(user!.fullName);
  return (
    <div className="container mx-auto py-10 px-4">
      <LeaveRequestsForm user={user!} outOfOfficeBalance={outOfOfficeBalance}/>
    </div>
  );
}
