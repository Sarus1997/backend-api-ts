import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
const { SetColor, COLOR } = require('./src/config/colorUtils');
import { get_data } from './src/model/get_data';

// Log server startup message
console.log(
  SetColor([COLOR.fg.magenta], "[Server]") +
  " " +
  SetColor([COLOR.fg.green], "Starting...")
);

// Dynamically import the 'open' module
(async () => {
  const open = (await import('open')).default;

  const port: number = 8888;
  const server: Application = express();

  // Serve static files from 'public' directory
  server.use(express.static(path.join(__dirname, 'public')));

  // Use bodyParser for handling JSON data
  server.use(bodyParser.json());

  // Define API route
  server.use('/api', get_data);

  server.listen(port, () => {
    console.log(
      SetColor([COLOR.fg.magenta], "[Server]") +
      " " +
      SetColor([COLOR.fg.green], "Server running...")
    );
    console.log(
      SetColor([COLOR.fg.green], `Server running on http://localhost:${port}`)
    );

    // Open the browser automatically
    open(`http://localhost:${port}`);
  });
})();
