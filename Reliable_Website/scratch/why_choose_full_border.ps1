$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw
$pattern = 'border: 1px solid rgba\(18, 63, 104, 0\.1\);'
$replacement = 'border: 2px solid var(--accent-orange);'
$content = [regex]::Replace($content, $pattern, $replacement)
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
