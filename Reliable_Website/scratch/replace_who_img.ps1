$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw
$content = $content -replace '<img src="assets/images/total-station\.jpg" alt="Professional Land Surveying"', '<img src="assets/images/who-we-are-new.jpg" alt="Professional Land Surveying"'
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
