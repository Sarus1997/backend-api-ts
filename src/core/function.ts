import crypto from 'crypto';

const generateSecretKey = (): string => crypto.randomBytes(32).toString('hex');

export { generateSecretKey };