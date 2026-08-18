import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCommodities(req: Request, res: Response) {
  try {
    const commodities = await prisma.commodity.findMany({
      orderBy: { name: 'asc' },
    });

    res.status(200).json({ status: 'success', results: commodities.length, data: commodities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch commodities' });
  }
}export async function createCommodity(req: Request, res: Response) {
  try {
    const { name, unit } = req.body || {};

    if (!name || !unit) {
      return res.status(400).json({ status: 'error', message: 'name and unit are required' });
    }

    const commodity = await prisma.commodity.create({
      data: { name, unit },
    });

    res.status(201).json({ status: 'success', data: commodity });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ status: 'error', message: 'A commodity with this name already exists' });
    }
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to create commodity' });
  }
}