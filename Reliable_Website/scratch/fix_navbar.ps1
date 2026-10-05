$indexHtml = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\index.html' -Raw
$aboutHtml = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw

$topBarRegex = [regex]::Match($indexHtml, '(?s)<!-- ==========================================\s*TOP BAR\s*========================================== -->\s*<div class="top-bar-exact">.*?</div>\s*</div>\s*</div>')
if ($topBarRegex.Success) {
    $topBarHtml = $topBarRegex.Value
} else {
    Write-Host "Failed to find Top Bar in index.html"
    exit 1
}

$navRegex = [regex]::Match($aboutHtml, '(?s)<nav class="nav-exact anim-nav">.*?</nav>')
if ($navRegex.Success) {
    $navHtml = $navRegex.Value
    
    # Remove old nav
    $aboutHtml = $aboutHtml.Replace($navHtml, '')
    
    # Prepend top bar and nav to body
    $replacement = "<body>`n`n    $topBarHtml`n`n    $navHtml`n"
    $aboutHtml = $aboutHtml.Replace('<body>', $replacement)
    
    Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $aboutHtml
    Write-Host "Success"
} else {
    Write-Host "Failed to find Nav in about.html"
}
