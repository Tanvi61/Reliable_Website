$css = @"

@keyframes floatY {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
.float-anim {
  animation: floatY 6s ease-in-out infinite;
}
"@

Add-Content -Path 'e:\MindAxis_Web\Reliable_Website\css\style.css' -Value $css
