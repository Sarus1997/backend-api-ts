import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
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
            padding: 20px;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
            text-align: center;
        }

        p {
            color: #666;
        }

        .highlight {
            color: #e74c3c;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Welcome to My Website</h1>
        <p>Hello and welcome! This is a simple webpage to demonstrate HTML and CSS.</p>
        <p>Here are some interesting facts:</p>
        <ul>
            <li>HTML stands for <span class="highlight">Hypertext Markup Language</span></li>
            <li>CSS stands for <span class="highlight">Cascading Style Sheets</span></li>
            <li>Together, they create beautiful web pages!</li>
        </ul>
        <p>Feel free to explore and learn more about web development.</p>
    </div>
</body>

</html>
    `);
  });

  //* Middleware for static files and parsing JSON requests *//
  server.use(express.static(path.join(__dirname, 'public')));
  server.use(bodyParser.json());

  //* Define routes with separate paths for GET and POST *//
  server.get('/api/get_data', get_data);
  server.post('/api/post_data', post_data);
  server.put('/api/update_data', update_data);
  server.delete('/api/delete_data', delete_data);

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
