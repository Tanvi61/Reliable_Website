$css = @"

.who-we-are-bg-anim {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: pulseBg 15s ease-in-out infinite;
}
"@

Add-Content -Path 'e:\MindAxis_Web\Reliable_Website\css\style.css' -Value $css
