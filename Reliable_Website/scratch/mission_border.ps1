$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw
$pattern = 'style="background: rgba\(255, 255, 255, 0\.03\); border: 1px solid rgba\(255, 255, 255, 0\.05\);'
$replacement = 'style="background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 8px 30px rgba(0,0,0,0.15);'
$content = [regex]::Replace($content, $pattern, $replacement)
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
