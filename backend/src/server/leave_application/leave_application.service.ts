import LeaveApplication, { ILeaveApplication } from './leave_application.model';

const createLeaveApplication = async (leaveData: Partial<ILeaveApplication>): Promise<ILeaveApplication> => {
  const leaveApplication = new LeaveApplication({
    ...leaveData,
    status: 'Pending', // Mặc định trạng thái là Pending
    createdAt: new Date()
  });
  return await leaveApplication.save();
};

const getLeaveApplications = async (): Promise<ILeaveApplication[]> => {
  return await LeaveApplication.find().populate('employeeId approvedBy');
};

const getLeaveApplicationById = async (id: string): Promise<ILeaveApplication | null> => {
  return await LeaveApplication.findById(id).populate('employeeId approvedBy');
};

const updateLeaveApplicationStatus = async (id: string, status: 'Approved' | 'Rejected', adminId: string): Promise<ILeaveApplication | null> => {
  return await LeaveApplication.findByIdAndUpdate(
    id,
    { status, approvedBy: adminId },
    { new: true }
  ).populate('employeeId approvedBy');
};

const deleteLeaveApplication = async (id: string): Promise<ILeaveApplication | null> => {
  return await LeaveApplication.findByIdAndDelete(id);
};

export default {
  createLeaveApplication,
  getLeaveApplications,
  getLeaveApplicationById,
  updateLeaveApplicationStatus,
  deleteLeaveApplication
};