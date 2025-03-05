export const Follow = (): string => `
  <style>
    .follow-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .follow {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .follow-link {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      transition: all 0.3s ease;
      text-decoration: none;
      color: #333;
      background: linear-gradient(145deg, #f0f0f0, #ffffff);
      box-shadow: 5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff;
      border: 1px solid transparent;
      position: relative;
      overflow: hidden;
    }

    .follow-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: all 0.6s ease;
    }

    .follow-link:hover::before {
      left: 100%;
    }

    .follow-link:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    }

    .follow-icon {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.75rem;
      transition: transform 0.3s ease;
    }

    .follow-link:hover .follow-icon {
      transform: rotate(360deg);
    }

    .follow-text {
      font-weight: 600;
      font-size: 1rem;
      letter-spacing: 0.5px;
    }

    /* Social Media Specific Styles */
    .github { color: #24292e; }
    .facebook { color: #1877f2; }
    .instagram { 
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
      color: white;
      border: none;
    }
    .twitter { color: #000000; }
    .linkedin { color: #0077b5; }

    @media (max-width: 600px) {
      .follow {
        flex-direction: column;
        align-items: stretch;
      }
      .follow-link {
        justify-content: center;
        width: 100%;
      }
    }
  </style>
  
  <div class="follow-container">
    <div class="follow">
      <a href="https://github.com/Sarus1997" target="_blank" rel="noopener noreferrer" class="follow-link github">
        <svg class="follow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
        <span class="follow-text">GitHub</span>
      </a>
      <a href="https://www.facebook.com/saharat.suwannapapond.7" target="_blank" rel="noopener noreferrer" class="follow-link facebook">
        <svg class="follow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
        <span class="follow-text">Facebook</span>
      </a>
      <a href="https://www.instagram.com/sr_sarus" target="_blank" rel="noopener noreferrer" class="follow-link instagram">
        <svg class="follow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
        <span class="follow-text">Instagram</span>
      </a>
      <a href="https://x.com/suwannapapond" target="_blank" rel="noopener noreferrer" class="follow-link twitter">
        <svg class="follow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
        </svg>
        <span class="follow-text">X</span>
      </a>
      <a href="https://www.linkedin.com/in/sr-sarus/" target="_blank" rel="noopener noreferrer" class="follow-link linkedin">
        <svg class="follow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
        <span class="follow-text">LinkedIn</span>
      </a>
    </div>
  </div>
`;