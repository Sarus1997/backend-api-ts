import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { logServerRunning } from './src/config/logger';
import { getData } from './src/model/get_data';
import { postData } from './src/model/post_data';
import { updateData } from './src/model/update_data';
import { deleteData } from './src/model/delete_data';
import pool from './src/server/db';

(async () => {
  const port: number = 8080;
  const server: Application = express();

  server.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to My Website</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 100vh;
              }

              .container {
                  max-width: 800px;
                  width: 90%;
                  background: white;
                  padding: 30px;
                  border-radius: 10px;
                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              }
          </style>
      </head>

      <body>
          <div class="container">
              <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Welcome to Backend API Ts</h1>
              <p style="coloe: #333; text-align: center; margin-bottom: 20px;">Create simple enterprise APIs. 🚀</p>
          </div>
      </body>

      </html>
    `);
  });

  //* Middleware for static files and parsing JSON requests *//
  server.use(express.static(path.join(__dirname, 'public')));
  server.use(bodyParser.json());

  //* Define routes with separate paths for GET and POST *//
  server.get('/api/get_data', getData);
  server.post('/api/post_data', postData);
  server.put('/api/update_data', updateData);
  server.delete('/api/delete_data', deleteData);

  //* Start server *//
  server.listen(port, () => {
    logServerRunning(port);
  });

  //* Test database connection *//
  try {
    const connection = await pool.getConnection();
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error.message);

  }
})();
