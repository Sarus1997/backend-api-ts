import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { logServerRunning } from './src/config/logger';
import pool from './src/server/db';
import router from './src/routes/route';
import { getHomePage } from './src/home';

(async () => {
  const port: number = 8080;
  const server: Application = express();

  server.use(express.static(path.join(__dirname, 'public')));
  server.use(bodyParser.json());

  server.use(router);

  server.get('/', (req, res) => {
    res.send(getHomePage());
  });

  server.listen(port, () => {
    logServerRunning(port);
  });

  try {
    const connection = await pool.getConnection();
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
})();
