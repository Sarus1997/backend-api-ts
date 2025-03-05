export const Header = (): string => `
  <style>
  .hero {
    padding: 4rem 2rem;
    text-align: center;
  }

  .hero h1 {
    color: #1F2937;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    letter-spacing: -0.025em;
  }

  .hero p {
    font-size: 1.25rem;
    color: #4B5563;
    margin-bottom: 2rem;

  }

  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .button-primary {
    background: #4F46E5;
    color: white;
    border: none;
  }

  .button-primary:hover {
    background: #4338CA;
  }

  .button-secondary {
    background: white;
    color: #4B5563;
    border: 1px solid #D1D5DB;
  }

  .button-secondary:hover {
    background: #F9FAFB;
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }
            
    .button-group {
      flex-direction: column;
    }        
  }
  </style>  

  <div class="hero">
    <h1>Backend API Ts</h1>
    <p>Create enterprise-grade APIs with ease and confidence 🚀</p>
    <div class="button-group">
      <button class="button button-primary">Get Started</button>
      <button class="button button-secondary">Documentation</button>
    </div>
  </div>
`;