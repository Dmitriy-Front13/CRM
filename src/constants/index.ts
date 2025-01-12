
export const POSITIONS = {
  HR_MANAGER: "HR Manager",
  PROJECT_MANAGER: "Project Manager",
  ADMINISTRATOR: "Administrator",
  EMPLOYEE: "Employee"
} as const;

export const SUBDIVISIONS = {
  HR: "HR",
  FINANCE: "Finance",
  MARKETING: "Marketing",
  SALES: "Sales",
  R_AND_D: "R&D",
  IT: "IT"
} as const;

export const PROJECT_TYPES = {
  SOFTWARE_DEVELOPMENT: "Software Development",
  MARKETING_CAMPAIGN: "Marketing Campaign",
  RESEARCH_AND_DEVELOPMENT: "Research and Development",
  INFRASTRUCTURE_UPGRADE: "Infrastructure Upgrade",
  PRODUCT_LAUNCH: "Product Launch"
} as const;

export const STATUS_CHOICE = {
  ACTIVE: "Active",
  INACTIVE: "Inactive"
} as const;

export const PROJECT_STATUSES = {
  ACTIVE: "Active",
  COMPLETED: "Completed"
} as const;

export const LEAVE_REQUEST_STATUS = {
  SUBMITTED: "Submitted",
  CANCELLED: "Cancelled",
  APPROVED: "Approved",
  REJECTED: "Rejected"
} as const;

export const ABSENCE_REASON = {
  SICK_LEAVE: "Sick Leave",
  VACATION: "Vacation",
  PERSONAL_LEAVE: "Personal Leave",
  FAMILY_LEAVE: "Family Leave",
  WORK_FROM_HOME: "Work from Home"
} as const;
