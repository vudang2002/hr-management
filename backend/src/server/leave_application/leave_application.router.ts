import { Router } from 'express';
import leaveApplicationController from './leave_application.controller';

const router = Router();

router.post('/leave-applications', leaveApplicationController.createLeaveApplication);
router.get('/leave-applications', leaveApplicationController.getLeaveApplications);
router.get('/leave-applications/:id', leaveApplicationController.getLeaveApplicationById);
router.put('/leave-applications/:id/status', leaveApplicationController.updateLeaveApplicationStatus);
router.delete('/leave-applications/:id', leaveApplicationController.deleteLeaveApplication);

export default router;