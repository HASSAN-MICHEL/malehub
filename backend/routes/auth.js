import { Router } from 'express';
import * as authCtrl from '../controllers/auth.js';
import { protect, adminOnly } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  loginSchema,
  createUserSchema,
  updateUserSchema,
  changePasswordSchema,
} from '../validations/auth.js';

const router = Router();


router.post('/login',         validate(loginSchema),         authCtrl.login);
router.post('/refresh-token', authCtrl.refreshToken);


router.use(protect);
router.get('/me',              authCtrl.getMe);
router.patch('/change-password', validate(changePasswordSchema), authCtrl.changePassword);


// ── Admin only 

router.use(adminOnly);
router.get('/users',              authCtrl.getUsers);
router.post('/users',            validate(createUserSchema),  authCtrl.createUser);
router.get('/users/:id',          authCtrl.getUserById);
router.patch('/users/:id',       validate(updateUserSchema),  authCtrl.updateUser);
router.delete('/users/:id',       authCtrl.deleteUser);

export default router;