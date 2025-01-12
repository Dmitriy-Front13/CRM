"use server";

import prisma from "@prisma/prisma";

export const getAllApprovalRequests = async () => {
  try {
    const approvalRequests = await prisma.approvalRequest.findMany();
    return approvalRequests;
  } catch (error) {
    throw error;
  }
};
export const getApprovalRequestsForHR = async (HR: string) => {
  try {
    const approvalRequests = await prisma.approvalRequest.findMany({
      where: {
        leaveRequest: {
          employee: {
            peoplePartner: HR
          }
        }
      },
    });
    return approvalRequests;
  } catch (error) {
    throw error;
  }
};
export const getApprovalRequestsForPM = async (PM: string) => {
  try {
    const approvalRequests = await prisma.approvalRequest.findMany({
      where: {
        leaveRequest: {
          employee: {
            projects: {
              some: {
                projectManager: PM
              }
            }
          }
        }
      },
    });
    return approvalRequests;
  } catch (error) {
    throw error;
  }
};