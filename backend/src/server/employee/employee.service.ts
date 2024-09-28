import Employee, { IEmployee } from './employee.model';

const createEmployee = async (employeeData: IEmployee): Promise<IEmployee> => {
  const employee = new Employee(employeeData);
  return await employee.save();
};

const getEmployeeById = async (id: string): Promise<IEmployee | null> => {
  return await Employee.findById(id);
};

const getAllEmployees = async (): Promise<IEmployee[]> => {
  return await Employee.find();
};

const updateEmployee = async (id: string, employeeData: Partial<IEmployee>): Promise<IEmployee | null> => {
  return await Employee.findByIdAndUpdate(id, employeeData, { new: true });
};

const deleteEmployee = async (id: string): Promise<IEmployee | null> => {
  return await Employee.findByIdAndDelete(id);
};

export default {
  createEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
};