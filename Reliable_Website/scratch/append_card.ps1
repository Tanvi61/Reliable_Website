$css = @"

@media (max-width: 991px) {
  .hero-text-card {
    background: rgba(255, 255, 255, 0.85);
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    backdrop-filter: blur(5px);
  }
}
"@

Add-Content -Path 'e:\MindAxis_Web\Reliable_Website\css\style.css' -Value $css
