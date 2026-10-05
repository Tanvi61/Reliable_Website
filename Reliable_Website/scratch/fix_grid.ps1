$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw
$pattern = 'style="display: grid; grid-template-columns: repeat\(4, 1fr\); gap: 30px;"'
$replacement = 'class="four-col-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;"'
$content = [regex]::Replace($content, $pattern, $replacement)
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content

$css = @"

/* Responsive 4-Column Grid for Why Choose Us */
@media (max-width: 991px) {
    .four-col-grid {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}
@media (max-width: 576px) {
    .four-col-grid {
        grid-template-columns: 1fr !important;
    }
}
"@
Add-Content -Path 'e:\MindAxis_Web\Reliable_Website\css\responsive.css' -Value $css
