$content = Get-Content 'e:\MindAxis_Web\Reliable_Website\css\style.css' -Raw
$pattern = '(?s)@keyframes bgPan \{.*?\.bg-pan-anim \{.*?\}'
$replacement = "@keyframes bgPan {`n  0% { transform: scale(1); }`n  50% { transform: scale(1.05); }`n  100% { transform: scale(1); }`n}`n.bg-pan-anim {`n  animation: bgPan 20s ease-in-out infinite;`n  transform-origin: center right;`n}"
$content = [regex]::Replace($content, $pattern, $replacement)
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\css\style.css' -Value $content
