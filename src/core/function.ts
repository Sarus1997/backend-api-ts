// src/core/function.ts
import crypto from 'crypto';

const generateSecretKey = (): string => crypto.randomBytes(32).toString('hex');

const generateProductId = (providedId?: string): string => {
  return providedId || crypto.randomUUID();
};

export { generateSecretKey, generateProductId };