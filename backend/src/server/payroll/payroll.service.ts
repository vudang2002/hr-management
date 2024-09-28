import { Payroll } from './payroll.model';

const createPayroll = async (payrollData: any): Promise<any> => {
  const payroll = new Payroll(payrollData);
  return await payroll.save();
};

const getPayrollById = async (id: string): Promise<any | null> => {
  return await Payroll.findById(id).populate('userId');
};

const getAllPayrolls = async (): Promise<any[]> => {
  return await Payroll.find().populate('userId');
};

const updatePayroll = async (id: string, payrollData: Partial<any>): Promise<any | null> => {
  return await Payroll.findByIdAndUpdate(id, payrollData, { new: true }).populate('userId');
};

const deletePayroll = async (id: string): Promise<any | null> => {
  return await Payroll.findByIdAndDelete(id);
};

export default {
  createPayroll,
  getPayrollById,
  getAllPayrolls,
  updatePayroll,
  deletePayroll
};