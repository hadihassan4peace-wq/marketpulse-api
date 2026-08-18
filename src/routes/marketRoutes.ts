import { Router } from 'express';
import { getAllMarkets, createMarket } from '../controllers/marketController';
import { protect, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * /markets:
 *   get:
 *     summary: Get all markets
 *     tags: [Markets]
 *     responses:
 *       200:
 *         description: A list of markets
 */
router.get('/', getAllMarkets);

/**
 * @swagger
 * /markets:
 *   post:
 *     summary: Create a new market (admin only)
 *     tags: [Markets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, city, state]
 *             properties:
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       201:
 *         description: Market created successfully
 *       403:
 *         description: Admin access required
 */
router.post('/', protect, requireAdmin, createMarket);

export default router;