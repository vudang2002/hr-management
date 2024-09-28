import { Router } from 'express';
import payrollController from './payroll.controller';

const router = Router();

router.post('/payrolls', payrollController.addPayroll);
router.get('/payrolls/:id', payrollController.getPayroll);
router.get('/payrolls', payrollController.getPayrolls);
router.put('/payrolls/:id', payrollController.updatePayroll);
router.delete('/payrolls/:id', payrollController.deletePayroll);

export default router;