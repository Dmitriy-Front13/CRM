import Link from "next/link";
import { Button } from "./ui/button";
import { logOut, encrypt } from "@/actions/auth/actions";
import { POSITIONS } from "@/constants";
const roleBasedPages = {
  [POSITIONS.HR_MANAGER]: [
    { href: "/projects", name: "Project list" },
    { href: "/employees", name: "Employee list" },
    { href: "/leave-requests", name: "LeaveRequestList" },
    { href: "/approval-requests", name: "ApprovalRequestList" },
  ],
  [POSITIONS.ADMINISTRATOR]: [
    { href: "/projects", name: "Project list" },
    { href: "/employees", name: "Employee list" },
    { href: "/leave-requests", name: "LeaveRequestList" },
    { href: "/approval-requests", name: "ApprovalRequestList" },
  ],
  [POSITIONS.PROJECT_MANAGER]: [
    { href: "/projects", name: "Project list" },
    { href: "/employees", name: "Employee list" },
    { href: "/leave-requests", name: "LeaveRequestList" },
    { href: "/approval-requests", name: "ApprovalRequestList" },
  ],
  [POSITIONS.EMPLOYEE]: [
    { href: "/projects", name: "My Projects" },
    { href: "/leave-requests", name: "My Leave Requests" },
  ],
};

export const NavigationBar = async () => {
  const user = await encrypt();
  if (!user) return null;
  const pages = roleBasedPages[user.position] || [];
  return (
    <header className="bg-white shadow-lg p-4">
      <nav className="flex items-center ">
        <ul className="flex justify-center items-center flex-1">
          {pages.map((page) => (
            <li className="p-2" key={page.href}>
              <Link href={page.href} className="btn-secondary">
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
        <Button variant="outline" className="w-[100px]" onClick={logOut}>
          Log out
        </Button>
      </nav>
    </header>
  );
};
