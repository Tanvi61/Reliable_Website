$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw
$pattern = 'style="width: 100%; border-radius: 8px; box-shadow: 0 20px 40px rgba\(0,0,0,0\.08\); position: relative; z-index: 1;"'
$replacement = 'style="width: 100%; border-radius: 8px; border: 6px solid #ffffff; box-shadow: 0 20px 40px rgba(0,0,0,0.12); position: relative; z-index: 1;"'
$content = [regex]::Replace($content, $pattern, $replacement)
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
