import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllMarkets(req: Request, res: Response) {
  try {
    const markets = await prisma.market.findMany({
      orderBy: { name: 'asc' },
    });

    res.status(200).json({ status: 'success', results: markets.length, data: markets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch markets' });
  }
}export async function createMarket(req: Request, res: Response) {
  try {
    const { name, city, state } = req.body || {};

    if (!name || !city || !state) {
      return res.status(400).json({ status: 'error', message: 'name, city, and state are required' });
    }

    const market = await prisma.market.create({
      data: { name, city, state },
    });

    res.status(201).json({ status: 'success', data: market });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ status: 'error', message: 'A market with this name already exists' });
    }
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to create market' });
  }
}