$css = @"

@keyframes bgSlide {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.expertise-bg-anim {
  background-size: cover;
  background-repeat: no-repeat;
  animation: bgSlide 25s ease-in-out infinite;
  transform: scale(1.1); /* Prevents edges from showing when panning */
}
"@

Add-Content -Path 'e:\MindAxis_Web\Reliable_Website\css\style.css' -Value $css
