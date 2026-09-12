import { Router } from 'express';
import { signup, login, me } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { signupValidation, loginValidation, validate } from '../validators/authValidators.js';

const router = Router();

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, me);

export default router;
