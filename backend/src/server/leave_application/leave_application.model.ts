import { Schema, model, Document } from 'mongoose';

interface ILeaveApplication extends Document {
  employeeId: Schema.Types.ObjectId;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
  approvedBy?: string;
  createdAt: Date;
}

const leaveApplicationSchema = new Schema<ILeaveApplication>({
  employeeId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  leaveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  reason: { type: String, required: true },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const LeaveApplication = model<ILeaveApplication>('LeaveApplication', leaveApplicationSchema);

export default LeaveApplication;
export { ILeaveApplication };