# Out of Office Solution

## Project Description

This project is a solution for managing employee leaves and absences within an organization. It includes role-based access control, authorization, and CRUD operations for employee management, built entirely with **Next.js**.

### Implemented Features:
- **Role-Based Access**:
  - Administrator, HR Manager, Project Manager, Employee.
- **Authorization**:
  - Secure login system using predefined credentials.
- **CRUD Operations for Employees**:
  - Create, update, and deactivate employees.
- **Dedicated Leave Requests Page**:
  - Employees can view and manage their leave requests.
- **Projects Page**:
  - Employees and managers can view relevant project details.

### Login Credentials:
1. **Full Name**: `Proger`  
   **Password**: `12345678`  
   **Role**: Employee
2. **Full Name**: `Alice Johnson`  
   **Password**: `securepassword`  
   **Role**: HR Manager
3. **Full Name**: `Oleg Lanovoy`  
   **Password**: `12345678`  
   **Role**: Administrator
4. **Full Name**: `PM`  
   **Password**: `12345678`  
   **Role**: Project Manager

## Core Functionality

1. **HR Manager**:
   - Full access to employee lists, leave requests, and approval requests.
   - Ability to add, update, and deactivate employees.
   - Approve or reject leave requests.

2. **Project Manager**:
   - Full access to project lists, leave requests, and approval requests.
   - Assign employees to projects.
   - Approve or reject leave requests.

3. **Employee**:
   - Access to their own leave requests and assigned projects.
   - Create, update, submit, and cancel leave requests.

## Deployment

The application is deployed on **Vercel**.  
You can access it at: [Application Link](https://erp-system-frontend-zeta.vercel.app/)

## Project Structure

- **Backend and Frontend**: Both are implemented using **Next.js**.
- **Database**: Integration with a relational database using Prisma for ORM.

## Future Enhancements

- Add advanced filtering and sorting options for data tables.
- Extend role-based permissions with more granular controls.
- Implement additional features as outlined in the technical specifications.
