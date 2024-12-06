//* ใช้คำสั่ง tsc เพื่อสร้างไลฟ์ dist เพื่อดูโครงสร้าง JavaScript *//

import express, { Application } from 'express';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import path from 'path';
import { logServerStartup, logServerRunning } from './src/config/logger';
const { get_data } = require('./src/model/get_data');
const { post_data } = require('./src/model/post_data');
const { update_data } = require('./src/model/update_data');
const { delete_data } = require('./src/model/delete_data');

const pool = mysql.createPool({
  host: 'localhost', // ชื่อโฮสต์ของฐานข้อมูล
  user: 'root',      // ชื่อผู้ใช้งานฐานข้อมูล
  password: 'password', // รหัสผ่านของผู้ใช้
  database: 'example_db', // ชื่อฐานข้อมูล
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;

// Log server startup message
logServerStartup();

// Dynamically import the 'open' module
(async () => {

  //** Server configuration **//
  const port: number = 8888;
  const server: Application = express();
  server.use(express.static(path.join(__dirname, 'public')));
  server.use(bodyParser.json());

  //** Page Welcome **//
  server.use('/', (req, res) => {
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

  //** Routes **//
  //? how to use --> http://localhost:port/api/get_data //
  server.use('/api', get_data);
  server.use('/api', post_data);
  server.use('/api', update_data);
  server.use('/api', delete_data);

  //** Start server **//
  server.listen(port, () => {
    logServerRunning(port);
  });
})();
