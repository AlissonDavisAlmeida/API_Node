import "reflect-metadata";
import "@shared/typeorm";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { AppError } from "@shared/errors/AppError";
import { errors } from "celebrate";
import upload_multer from "@config/upload_multer";
import { routes } from "./routes";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/files", express.static(upload_multer.directory));

app.use(routes);
app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      error: error.message,
    });
  }
  return response.status(500).json({
    status: 500,
    error: `Internal server error async: ${error}`,

  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log("Server is running on port 3000");
});
