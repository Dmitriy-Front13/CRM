import Link from 'next/link';

const pages = [
  { href: "/projects", name: "Project list" },
  { href: "/employees", name: "Employee list" },
  { href: "/leave-requests", name: "LeaveRequestList" },
  { href: "/approval-requests", name: "ApprovalRequestList" },
];

export const NavigationBar= () => {
  return (
    <nav className='bg-white shadow-lg rounded-lg p-4'>
      <ul className='flex justify-center items-center'>
      {pages.map((page) => (
          <li className="p-2" key={page.href}>
            <Link href={page.href} className="btn-secondary">
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};