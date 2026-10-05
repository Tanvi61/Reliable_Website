$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw
$content = $content -replace 'expertise-slider-wrapper', 'exp-slider-wrapper'
$content = $content -replace 'expertise-card', 'exp-slider-card'
$content = $content -replace 'expertise-img-col', 'exp-slider-img-col'
$content = $content -replace 'expertise-content-col', 'exp-slider-content-col'
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
