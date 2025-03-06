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
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    </head>
    <style>
      :root {
        --primary-color: #3B82F6;
        --secondary-color: #10B981;
        --text-color: #1F2937;
        --background-color: #F3F4F6;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
      }

      body {
        min-height: 100vh;
        background: linear-gradient(135deg, #E0E7FF 0%, #F0F5FF 100%);
        color: var(--text-color);
        line-height: 1.6;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
      }

      .card {
        background: white;
        border-radius: 1.5rem;
        box-shadow: 
          0 25px 50px -12px rgba(0, 0, 0, 0.08),
          0 10px 15px -3px rgba(0, 0, 0, 0.05);
        overflow: hidden;
        transition: transform 0.3s ease;
      }


      @media (max-width: 768px) {
        .container {
          padding: 1rem 0.5rem;
        }

        .card {
          border-radius: 1rem;
        }
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