$css = @"

/* Hero Custom Animations */
@keyframes bgPan {
  0% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
.bg-pan-anim {
  animation: bgPan 4s ease-out forwards;
  transform-origin: center right;
}

@keyframes textFadeInLeft {
  0% { opacity: 0; transform: translateX(-30px); }
  100% { opacity: 1; transform: translateX(0); }
}
.text-fade-in-left {
  animation: textFadeInLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.2s;
  opacity: 0;
}
"@

Add-Content -Path 'e:\MindAxis_Web\Reliable_Website\css\style.css' -Value $css
