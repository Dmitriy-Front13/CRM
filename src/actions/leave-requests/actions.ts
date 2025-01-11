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