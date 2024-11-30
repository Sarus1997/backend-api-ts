import { Request, Response } from 'express';
import crypto from 'crypto';

const generateSecretKey = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

const message = "แมวขาว888.com ชวนลงทุนอันดับหนึ่ง เจ๊งก็เรื่องของมึง";

const secretKey = generateSecretKey();

const get_data = (req: Request, res: Response): void => {
  res.json({
    message,
    timestamp: new Date().toLocaleString(),
    secretKey,
    serverTime: new Date().toLocaleString(),
    requestHeaders: req.headers,
    requestBody: req.body,
  });
};

export { get_data };

