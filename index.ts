import express, { Application } from 'express';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import path from 'path';

//* Import your custom modules *//
import { logServerStartup, logServerRunning } from './src/config/logger';
import { get_data } from './src/model/get_data';
import { post_data } from './src/model/post_data';
import { update_data } from './src/model/update_data';
import { delete_data } from './src/model/delete_data';
import pool from './src/server/db';

//* Log server startup *//
logServerStartup();

(async () => {
  const port: number = 8888;
  const server: Application = express();

  //* Middleware for static files and parsing JSON requests *//
  server.use(express.static(path.join(__dirname, 'public')));
  server.use(bodyParser.json());

  //* Define routes *//
  server.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello World</title>
      </head>
      <body>
          <h1>Hello World</h1>
      </body>
      </html>
    `);
  });

  server.use('/api', get_data);
  server.use('/api', post_data);
  server.use('/api', update_data);
  server.use('/api', delete_data);

  //* Start server *//
  server.listen(port, () => {
    logServerRunning(port);
  });

  //* Test database connection *//
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
})();
