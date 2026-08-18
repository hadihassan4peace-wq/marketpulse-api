import { Router } from 'express';
import { createPriceReport, getPriceReports, getPriceStats } from '../controllers/priceReportController';
import { protect } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import { priceReportSchema } from '../utils/validationSchemas';

const router = Router();
/**
 * @swagger
 * /price-reports/stats:
 *   get:
 *     summary: Get aggregated price statistics per commodity
 *     tags: [Price Reports]
 *     parameters:
 *       - in: query
 *         name: marketId
 *         schema:
 *           type: string
 *         description: Filter stats to a specific market
 *     responses:
 *       200:
 *         description: Aggregated stats (average, min, max, count) per commodity
 */
router.get('/stats', getPriceStats);
/**
 * @swagger
 * /price-reports:
 *   get:
 *     summary: Get price reports, optionally filtered
 *     tags: [Price Reports]
 *     parameters:
 *       - in: query
 *         name: marketId
 *         schema:
 *           type: string
 *       - in: query
 *         name: commodityId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of price reports
 */
router.get('/', getPriceReports);
/**
 * @swagger
 * /price-reports:
 *   post:
 *     summary: Submit a new price report
 *     tags: [Price Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [marketId, commodityId, price]
 *             properties:
 *               marketId:
 *                 type: string
 *               commodityId:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Price report created successfully
 *       400:
 *         description: Validation failed
 */

router.post('/', protect, validate(priceReportSchema), createPriceReport);

export default router;