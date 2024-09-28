import { Router } from 'express';
import employeeController from './employee.controller';

const router = Router();

router.post('/employees', employeeController.addEmployee);
router.get('/employees/:id', employeeController.getEmployee);
router.get('/employees', employeeController.getEmployees);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

export default router;