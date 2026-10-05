$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw

$pattern = '(?s)<!-- 2\. WHO WE ARE -->\s*<section class="section" style="padding: 100px 20px; background-color: #ffffff; overflow-x: hidden;">\s*<div class="container" style="position: relative; z-index: 1;">'
$replacement = @"
    <!-- 2. WHO WE ARE -->
    <section class="section" style="padding: 100px 20px; position: relative; overflow-x: hidden;">
        <!-- Animated Background Image -->
        <div class="who-we-are-bg-anim"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('assets/images/who-we-are-bg.png'); z-index: 0; pointer-events: none;">
        </div>
        <div class="container" style="position: relative; z-index: 1;">
"@

if ($content -match $pattern) {
    $content = [regex]::Replace($content, $pattern, $replacement)
    Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
} else {
    Write-Host "Pattern not found"
}
