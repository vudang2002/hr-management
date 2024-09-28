import { Request, Response } from 'express';
import employeeService from './employee.service';

const addEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const getEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const getEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await employeeService.deleteEmployee(req.params.id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export default {
  addEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
};