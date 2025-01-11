"use server"
import { LeaveRequestFormData } from "@/components/leave-requests/leave-requests-form";
import prisma from "@prisma/prisma";

export const getLeaveRequestsForEmployee = async (employeeName: string) => {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany({
      where: { employeeName },
    });
    return leaveRequests;
  } catch (error) {
    throw error;
  }
};

export const getAllLeaveRequests = async () => {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany();
    return leaveRequests;
  } catch (error) {
    throw error;
  }
}

export const createLeaveRequest = async (data: LeaveRequestFormData) => {
  try {
    await prisma.leaveRequest.create({ 
      data: {
        ...data,
        approvalRequest: {
          create: {
            status: "New"
          }
        }
      } 
    });
  } catch (error) {
    throw error;
  }
}