$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw
$pattern = '<!-- 4\. WHY CHOOSE US \(Highly Animated\) -->\s*<section class="section" style="padding: 100px 20px; background-color: #f8f9fa; position: relative; overflow: hidden;">'
$replacement = '<!-- 4. WHY CHOOSE US (Highly Animated) -->
    <section class="section" style="padding: 100px 20px; background-color: #ffffff; background-image: url(''assets/images/why-choose-us-bg.png''); background-size: cover; background-position: center; background-repeat: no-repeat; position: relative; overflow: hidden;">'
$content = [regex]::Replace($content, $pattern, $replacement)
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
