import { Request, Response } from "express";
import leaveApplicationService from "./leave_application.service";
import mongoose from "mongoose";
const createLeaveApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { employeeId, startDate, endDate, reason, leaveType } = req.body;

    // Validate employeeId
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      res.status(400).json({ message: "Invalid employeeId" });
      return;
    }
    // Validate leaveType
    if (!leaveType) {
      res.status(400).json({ message: "leaveType is required" });
      return;
    }
    const leaveApplication =
      await leaveApplicationService.createLeaveApplication({
        employeeId,
        startDate,
        endDate,
        reason,
        leaveType,
      });

    res.status(201).json(leaveApplication);
  } catch (error) {
    console.error("Error creating leave application:", error);
    res.status(400).json({ message: (error as Error).message });
  }
};

const getLeaveApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const leaveApplications =
      await leaveApplicationService.getLeaveApplications();
    res.status(200).json(leaveApplications);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const getLeaveApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const leaveApplication =
      await leaveApplicationService.getLeaveApplicationById(req.params.id);
    if (!leaveApplication) {
      res.status(404).json({ message: "Leave application not found" });
      return;
    }
    res.status(200).json(leaveApplication);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const updateLeaveApplicationStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status, adminId } = req.body;
    if (!["Approved", "Rejected"].includes(status)) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }
    const leaveApplication =
      await leaveApplicationService.updateLeaveApplicationStatus(
        req.params.id,
        status,
        adminId
      );
    if (!leaveApplication) {
      res.status(404).json({ message: "Leave application not found" });
      return;
    }
    res.status(200).json(leaveApplication);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const deleteLeaveApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const leaveApplication =
      await leaveApplicationService.deleteLeaveApplication(req.params.id);
    if (!leaveApplication) {
      res.status(404).json({ message: "Leave application not found" });
      return;
    }
    res.status(200).json({ message: "Leave application deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export default {
  createLeaveApplication,
  getLeaveApplications,
  getLeaveApplicationById,
  updateLeaveApplicationStatus,
  deleteLeaveApplication,
};
