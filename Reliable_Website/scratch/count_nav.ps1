$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Raw
$count = ([regex]::Matches($content, '<nav ')).Count
Write-Host "Nav count: $count"
$count2 = ([regex]::Matches($content, '<div class="top-bar-exact"')).Count
Write-Host "Top bar count: $count2"
