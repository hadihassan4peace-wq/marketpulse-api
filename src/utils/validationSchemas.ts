import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Must be a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export const priceReportSchema = z.object({
  marketId: z.string().uuid('marketId must be a valid ID'),
  commodityId: z.string().uuid('commodityId must be a valid ID'),
  price: z.number().positive('Price must be a positive number').max(10000000, 'Price seems unrealistically high'),
});