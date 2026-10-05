$css = @"

@media (max-width: 991px) {
  .mobile-text-center {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
"@

Add-Content -Path 'e:\MindAxis_Web\Reliable_Website\css\responsive.css' -Value $css
