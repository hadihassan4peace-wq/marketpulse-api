import { Router } from 'express';
import { getAllCommodities, createCommodity } from '../controllers/commodityController';
import { protect, requireAdmin } from '../middleware/authMiddleware';

const router = Router();
/**
 * @swagger
 * /commodities:
 *   get:
 *     summary: Get all commodities
 *     tags: [Commodities]
 *     responses:
 *       200:
 *         description: A list of commodities
 */
router.get('/', getAllCommodities);
/**
 * @swagger
 * /commodities:
 *   post:
 *     summary: Create a new commodity (admin only)
 *     tags: [Commodities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, unit]
 *             properties:
 *               name:
 *                 type: string
 *               unit:
 *                 type: string
 *     responses:
 *       201:
 *         description: Commodity created successfully
 */
router.post('/', protect, requireAdmin, createCommodity);

export default router;