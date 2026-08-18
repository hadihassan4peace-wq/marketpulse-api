import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { protect, AuthRequest } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import { registerSchema } from '../utils/validationSchemas';
import { Response } from 'express';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', login);

router.get('/me', protect, (req: AuthRequest, res: Response) => {
  res.status(200).json({ status: 'success', data: req.user });
});

export default router;