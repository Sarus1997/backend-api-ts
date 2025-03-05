export const Footer = (): string => `
  <style>
    .footer {
      padding: 1.5rem;
      text-align: center;
      border-top: 1px solid #E5E7EB;
      color: #4B5563;
    }
  </style>

  <div class="footer">
    <p>© <span id="year"></span> Developed ⚒️ by <a href="https://www.facebook.com/saharat.suwannapapond.7">Sarus</a></p>
    <script>
      document.getElementById('year').textContent = new Date().getFullYear();
    </script>
  </div>
`;
