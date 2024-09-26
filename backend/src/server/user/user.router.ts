import { Router } from 'express';
import userController from './user.controller';

const router = Router();

router.post('/users', userController.addUser);
router.get('/users/:id', userController.getUser);
router.get('/users', userController.getUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export default router;