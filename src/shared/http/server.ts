import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { AppError } from '@shared/errors/AppError';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      error: error.message,
    });
  }
  return response.status(500).json({
    status: 500,
    error: 'Internal server error',
  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 3000');
});
