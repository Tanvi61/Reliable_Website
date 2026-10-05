$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw
$content = $content -replace '(?s)\s*<!-- Watermark -->\s*<div class="exp-watermark" id="exp-watermark">\d+</div>', ''
$content = $content -replace '\s*const watermark = document\.getElementById\(''exp-watermark''\);', ''
$content = $content -replace '\s*watermark\.style\.opacity = 0;', ''
$content = $content -replace '\s*watermark\.innerText = ''0'' \+ \(currentExpIndex \+ 1\);', ''
$content = $content -replace '\s*watermark\.style\.opacity = 1;', ''
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
