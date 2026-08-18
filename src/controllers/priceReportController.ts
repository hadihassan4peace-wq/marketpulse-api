import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export async function createPriceReport(req: AuthRequest, res: Response) {
  try {
    const { marketId, commodityId, price } = req.body || {};
  

    if (!marketId || !commodityId || price === undefined) {
      return res.status(400).json({ status: 'error', message: 'marketId, commodityId, and price are required' });
    }

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ status: 'error', message: 'price must be a positive number' });
    }

    const userId = req.user!.userId;

    const priceReport = await prisma.priceReport.create({
      data: { marketId, commodityId, price, userId },
      include: {
        market: { select: { name: true, city: true } },
        commodity: { select: { name: true, unit: true } },
      },
    });
    

    res.status(201).json({ status: 'success', data: priceReport });
  } catch (error: any) {
    if (error.code === 'P2003') {
      return res.status(400).json({ status: 'error', message: 'Invalid marketId or commodityId — no matching record found' });
    }
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to create price report' });
  }
}
export async function getPriceReports(req: Request, res: Response) {
  try {
    const { marketId, commodityId } = req.query;

    const where: any = {};
    if (marketId) where.marketId = marketId as string;
    if (commodityId) where.commodityId = commodityId as string;

    const priceReports = await prisma.priceReport.findMany({
      where,
      orderBy: { reportedAt: 'desc' },
      take: 50,
      include: {
        market: { select: { name: true, city: true, state: true } },
        commodity: { select: { name: true, unit: true } },
        user: { select: { name: true } },
      },
    });

    res.status(200).json({ status: 'success', results: priceReports.length, data: priceReports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch price reports' });
  }
}export async function getPriceStats(req: Request, res: Response) {
  try {
    const { marketId } = req.query;

    const where: any = {};
    if (marketId) where.marketId = marketId as string;

    const stats = await prisma.priceReport.groupBy({
      by: ['commodityId'],
      where,
      _avg: { price: true },
      _min: { price: true },
      _max: { price: true },
      _count: { price: true },
    });

    const commodityIds = stats.map((s) => s.commodityId);
    const commodities = await prisma.commodity.findMany({
      where: { id: { in: commodityIds } },
    });

    const enriched = stats.map((s) => {
      const commodity = commodities.find((c) => c.id === s.commodityId);
      return {
        commodity: commodity?.name,
        unit: commodity?.unit,
        averagePrice: s._avg.price,
        minPrice: s._min.price,
        maxPrice: s._max.price,
        reportCount: s._count.price,
      };
    });

    res.status(200).json({ status: 'success', results: enriched.length, data: enriched });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to compute price stats' });
  }
}