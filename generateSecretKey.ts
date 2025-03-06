import * as crypto from 'crypto';

const secretKey: string = crypto.randomBytes(128).toString('hex');
console.log("Generated JWT Secret Key:", secretKey);
