import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MarketPulse API',
      version: '1.0.0',
      description: 'Crowdsourced local market price index for Nigerian markets.',
    },
   servers: [
  { url: 'https://marketpulse-api-6t20.onrender.com/api/v1', description: 'Production (Render)' },
  { url: 'http://localhost:5000/api/v1', description: 'Local development' },
],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);