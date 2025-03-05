export const Footer = (): string => `
  <style>
    .footer {
      background: linear-gradient(to right, #f7f9fc, #f0f4f8);
      padding: 1.5rem;
      text-align: center;
      border-top: 1px solid #E5E7EB;
      box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }
    .footer:hover {
      background: linear-gradient(to right, #e9edf3, #e3e9f2);
    }
    .footer a {
      color: #3B82F6;
      text-decoration: none;
      font-weight: semibold;
      transition: color 0.3s ease;
    }
    .footer a:hover {
      color: #2563EB;
      text-decoration: underline;
    }
  </style>

  <div class="footer">
    <p class="text-gray-600 text-sm">
      © <span id="year" class="font-bold"></span> Developed with 
      <span class="text-red-500">❤️</span> by 
      <a href="https://www.facebook.com/saharat.suwannapapond.7" target="_blank" rel="noopener noreferrer">
        Sarus
      </a>
    </p>
    <script>
      document.getElementById('year').textContent = new Date().getFullYear();
    </script>
  </div>
`;