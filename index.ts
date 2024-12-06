import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { logServerStartup, logServerRunning } from './src/config/logger';
const { get_data } = require('./src/model/get_data');

// Log server startup message
logServerStartup();

// Dynamically import the 'open' module
(async () => {

  //** Server configuration **//
  const port: number = 8888;
  const server: Application = express();
  server.use(express.static(path.join(__dirname, 'public')));
  server.use(bodyParser.json());

  //** Routes **//
  server.use('/api', get_data);

  //** Start server **//
  server.listen(port, () => {
    logServerRunning(port);
  });
})();
