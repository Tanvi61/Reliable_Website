$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw

# Replace dark black background with primary navy background
$content = $content -replace 'background-color: #0d1117;', 'background: linear-gradient(135deg, var(--dark-navy) 0%, var(--primary-navy) 100%);'

# Replace red glow with orange glow
$content = $content -replace 'rgba\(220,53,69,0\.05\)', 'rgba(244,123,32,0.15)'

# Replace red hex codes with orange hex / var
$content = $content -replace '#dc3545', 'var(--accent-orange)'

# Replace red rgb values for icon backgrounds with orange
$content = $content -replace 'rgba\(220, 53, 69, 0\.1\)', 'rgba(244, 123, 32, 0.15)'

Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
