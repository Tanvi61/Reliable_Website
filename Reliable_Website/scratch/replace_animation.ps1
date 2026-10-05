$content = Get-Content 'e:\MindAxis_Web\Reliable_Website\css\style.css' -Raw
$pattern = '(?s)@keyframes bgSlide \{.*?\.expertise-bg-anim \{.*?\}'
$replacement = ".expertise-bg-anim {`n  background-size: cover;`n  background-position: center;`n  background-repeat: no-repeat;`n  animation: pulseBg 10s ease-in-out infinite;`n}`n@keyframes pulseBg {`n  0% { filter: brightness(1); }`n  50% { filter: brightness(1.05); }`n  100% { filter: brightness(1); }`n}"
if ($content -match $pattern) {
    $content = [regex]::Replace($content, $pattern, $replacement)
    Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\css\style.css' -Value $content
} else {
    Write-Host "Pattern not found!"
}
