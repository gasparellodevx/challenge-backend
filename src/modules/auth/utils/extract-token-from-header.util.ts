import type { Request } from 'express';

export function extractTokenFromHeader(req: Request) {
  const [, token] = req?.headers.authorization?.split(' ') ?? [];

  return token;
}
