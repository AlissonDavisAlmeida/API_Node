import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  iat: number,
  exp: number;
}

export const authenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new AppError("You must be logged in to access this endpoint", 401);
  }

  const [, token] = req.headers.authorization.split(" ");

  if (!token) {
    throw new AppError("You must be logged in to access this endpoint", 401);
  }

  const decoded = verify(token, process.env.JWT_SECRET_KEY as string);

  if (!decoded) {
    throw new AppError("You must be logged in to access this endpoint", 401);
  }

  const { userId } = decoded as TokenPayload;

  req.user = {
    id: userId,
  };

  next();
};
