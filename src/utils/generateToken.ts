import jwt from 'jsonwebtoken';

export function generateToken(userId: string, role: string): string {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign({ userId, role }, secret, { expiresIn } as jwt.SignOptions);
}