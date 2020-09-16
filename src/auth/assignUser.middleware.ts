/* eslint-disable @typescript-eslint/ban-types */
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction, Request } from 'express';

const jwt = new JwtService({
  secret: process.env.JWT_SECERET,
});

export async function assignUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req?.headers?.authorization?.split(' ')[1];
  const user = jwt.decode(token);
  req.user = user;
  next();
}
