export const Follow = (): string => `
  <div class="follow">
    <a href="https://github.com/Sarus1997" target="_blank" rel="noopener noreferrer" class="follow-link">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 1.5rem; height: 1.5rem;">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      <span class="follow-text">GitHub</span>
    </a>
    <a href="https://www.facebook.com/saharat.suwannapapond.7" target="_blank" rel="noopener noreferrer" class="follow-link">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 1.5rem; height: 1.5rem;">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8a6 6 0 016 6v3E14 21a1 1 0 01-1-1V8a2 2 0 00-2-2h-4"/>
      </svg>
      <span class="follow-text">Facebook</span>
    </a>
  </div>

  <style>
    .follow {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }

    .follow-link {
      display: flex;
      align-items: center;
      margin-right: 1rem;
    }

    .follow-text {
      margin-left: 0.5rem;
    }
  </style>
`;
