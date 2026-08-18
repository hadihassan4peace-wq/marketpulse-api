import authRoutes from './routes/authRoutes';
import marketRoutes from './routes/marketRoutes';
import commodityRoutes from './routes/commodityRoutes';
import priceReportRoutes from './routes/priceReportRoutes';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/markets', marketRoutes);
app.use('/api/v1/commodities', commodityRoutes);
app.use('/api/v1/price-reports', priceReportRoutes);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', service: 'marketpulse-api' });
});

export default app;