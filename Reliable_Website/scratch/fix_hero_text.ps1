$content = Get-Content 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw
$content = $content -replace '<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 50px;">', '<div class="text-fade-in-left hero-text-card" style="max-width: 600px; padding-bottom: 50px;">'
$content = $content -replace '<span style="color: var\(--dark-navy\);">Expertise.', '<span style="color: var(--accent-orange);">Expertise.'
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
