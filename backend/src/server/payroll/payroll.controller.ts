import { Request, Response } from 'express';
import payrollService from './payroll.service';

const addPayroll = async (req: Request, res: Response): Promise<void> => {
  try {
    const payroll = await payrollService.createPayroll(req.body);
    res.status(201).json(payroll);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const getPayroll = async (req: Request, res: Response): Promise<void> => {
  try {
    const payroll = await payrollService.getPayrollById(req.params.id);
    if (!payroll) {
      res.status(404).json({ message: 'Payroll not found' });
      return;
    }
    res.status(200).json(payroll);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const getPayrolls = async (req: Request, res: Response): Promise<void> => {
  try {
    const payrolls = await payrollService.getAllPayrolls();
    res.status(200).json(payrolls);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const updatePayroll = async (req: Request, res: Response): Promise<void> => {
  try {
    const payroll = await payrollService.updatePayroll(req.params.id, req.body);
    if (!payroll) {
      res.status(404).json({ message: 'Payroll not found' });
      return;
    }
    res.status(200).json(payroll);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const deletePayroll = async (req: Request, res: Response): Promise<void> => {
  try {
    const payroll = await payrollService.deletePayroll(req.params.id);
    if (!payroll) {
      res.status(404).json({ message: 'Payroll not found' });
      return;
    }
    res.status(200).json({ message: 'Payroll deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export default {
  addPayroll,
  getPayroll,
  getPayrolls,
  updatePayroll,
  deletePayroll
};