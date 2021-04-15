import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.jtw.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('JWT invalid token', 401);
  }
}
