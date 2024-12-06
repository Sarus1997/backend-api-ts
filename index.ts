import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { logServerStartup, logServerRunning } from './src/config/logger';
import { get_data } from './src/model/get_data';
import { post_data } from './src/model/post_data';
import { update_data } from './src/model/update_data';
import { delete_data } from './src/model/delete_data';
import pool from './src/server/db';

logServerStartup();

(async () => {
  const port: number = 8888;
  const server: Application = express();

  // Serve static files
  server.use(express.static(path.join(__dirname, 'public')));
  server.use(bodyParser.json());

  // Define routes
  server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views', 'home.html'));
  });

  server.get('/api/get_data', get_data);
  server.post('/api/post_data', post_data);
  server.put('/api/update_data', update_data);
  server.delete('/api/delete_data', delete_data);

  // Start server
  server.listen(port, () => {
    logServerRunning(port);
  });

  // Test database connection
  try {
    const connection = await pool.getConnection();
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
})();
