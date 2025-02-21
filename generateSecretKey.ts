import * as crypto from 'crypto';

const secretKey: string = crypto.randomBytes(64).toString('hex');
console.log(secretKey);
