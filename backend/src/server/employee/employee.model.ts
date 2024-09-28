import { Schema, model, Document } from "mongoose";

interface IEmployee extends Document {
  name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  salary: number;
  dateJoined?: Date;
  leaveBalance?: number;
  role?: string;
  userId: Schema.Types.ObjectId; // Thêm trường userId
  createdAt?: Date;
  updatedAt?: Date;
}

const EmployeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  department: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  dateJoined: { type: Date, default: Date.now },
  leaveBalance: { type: Number, default: 12 },
  role: { type: String, enum: ["Admin", "Employee"], default: "Employee" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Employee = model<IEmployee>("Employee", EmployeeSchema);

export default Employee;
export { IEmployee };
