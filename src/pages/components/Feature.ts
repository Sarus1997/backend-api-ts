export const Feature = (): string => `

  <style>
    .features {
      background: #F9FAFB;
      padding: 3rem 2rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .feature-icon {
      width: 3rem;
      height: 3rem;
      background: #EEF2FF;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .feature-icon svg {
      width: 1.5rem;
      height: 1.5rem;
      color: #4F46E5;
    }

    .feature-card h3 {
      color: #1F2937;
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
    }

    .feature-card p {
      color: #4B5563;
    }

    @media (max-width: 768px) {
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>

  <div class="features">
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <h3>Lightning Fast</h3>
        <p>Optimized performance for quick response times and efficient processing.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h3>Secure by Default</h3>
        <p>Built-in security features to protect your data and applications.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
          </svg>
        </div>
        <h3>TypeScript First</h3>
        <p>Full TypeScript support for better development experience and type safety.</p>
      </div>
    </div>
  </div>

`;
