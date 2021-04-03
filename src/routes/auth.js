import { Router } from 'express';

import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from '../controllers/auth';

const router = Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/forgotpassword').post(forgotPassword);

router.route('/resetpassword/:restToken').post(resetPassword);

export default router;
