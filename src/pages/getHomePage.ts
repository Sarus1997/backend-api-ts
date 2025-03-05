import { Header } from "./components/Header";
import { Feature } from "./components/Feature";
import { Follow } from "./components/Follow";
import { Footer } from "./components/Footer";

export const getHomePage = (): string => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to My Website</title>
    </head>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Arial', sans-serif;
      }

      body {
        min-height: 100vh;
        background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
        padding: 4rem 1rem;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .card {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
    </style>
    <body>
      <div class="container">
        <div class="card">
          ${Header()}
          ${Feature()}
          ${Follow()}
          ${Footer()}
        </div>
      </div>
    </body>
  </html>
`;
