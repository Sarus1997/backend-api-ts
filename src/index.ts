import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import { logServerRunning } from './config/logger';
import router from './routes/route';
import { getHomePage } from './pages/getHomePage';

//* กำหนดตัวแปรการตั้งต่า server
dotenv.config();

(async () => {
  const port: number = 8080;
  const server: Application = express();

  server.use(express.static(path.join(__dirname, 'public')));
  server.use(bodyParser.json());
  server.use(router);

  //* หน้าแรก
  server.get('/', (req, res) => {
    res.send(getHomePage());
  });

  //* เริ่มต้นเซิร์ฟเวอร์
  server.listen(port, () => {
    logServerRunning(port);
  });
})();
