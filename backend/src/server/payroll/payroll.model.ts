import { Schema, model, Types } from "mongoose";

const PayrollSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true }, // Liên kết với bảng User
    baseSalary: { type: Number, required: true },
    bonus: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, required: true },
    payrollDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Payroll = model("Payroll", PayrollSchema);
