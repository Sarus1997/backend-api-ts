import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
const { SetColor, COLOR } = require('./config/colorUtils');
import { get_data } from './model/get_data.ts';

console.log(
  SetColor([COLOR.fg.magenta], "[Server]") +
  " " +
  SetColor([COLOR.fg.green], "Starting...")
);

const open = require('open');
const port: number = 8888;
const server: Application = express();

// ให้บริการไฟล์ static จากโฟลเดอร์ public
server.use(express.static(path.join(__dirname, 'public')));

// ใช้ bodyParser เพื่อจัดการกับข้อมูล JSON
server.use(bodyParser.json());

// กำหนดเส้นทาง API
server.use('/api', get_data);

server.listen(port, () => {
  console.log(
    SetColor([COLOR.fg.magenta], "[Server]") +
    " " +
    SetColor([COLOR.fg.green], "Starting...")
  );
  console.log(
    SetColor([COLOR.fg.magenta], "[Server]") +
    " " +
    SetColor([COLOR.fg.green], "Starting...")
  );
  console.log(
    SetColor([COLOR.fg.magenta], "[Server]") +
    " " +
    SetColor([COLOR.fg.green], "Starting...")
  );
  console.log(
    SetColor([COLOR.fg.magenta], "Server") +
    " " +
    SetColor([COLOR.fg.red], "Getting ready...")
  );
  console.log(
    SetColor([COLOR.fg.green], `Server running on http://localhost:${port}`)
  );

  // เปิดเบราว์เซอร์ไปที่หน้าแรกอัตโนมัติ
  if (open) {
    open(`http://localhost:${port}`);
  }
});
