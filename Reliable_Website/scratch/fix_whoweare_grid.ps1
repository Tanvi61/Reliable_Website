$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw
$pattern = '(?s)(<!-- 2\. WHO WE ARE -->.*?<div class="container" style="position: relative; z-index: 1;">\s*<div\s*style="display: grid; grid-template-columns: )repeat\(4, 1fr\)(; gap: 50px; align-items: center;">)'
if ($content -match $pattern) {
    $content = [regex]::Replace($content, $pattern, '${1}repeat(auto-fit, minmax(280px, 1fr))${2}')
    Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
} else {
    Write-Host "Pattern not found"
}
