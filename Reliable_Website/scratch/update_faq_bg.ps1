$files = @(
    "topographical-survey.html",
    "dgps-gnss-control.html",
    "total-station-survey.html",
    "rtk-drone-mapping.html",
    "lidar-3d-scanning.html",
    "cad-gis-processing.html",
    "drone-photogrammetry.html",
    "rail-metro.html",
    "road-highway.html"
)

foreach ($file in $files) {
    $path = "e:\MindAxis_Web\Reliable_Website\$file"
    $content = Get-Content -Path $path -Raw
    
    # Replace the background color with the new background image
    $oldLine = '<section class="section" style="padding: 60px 0; background-color: #fff;">'
    $newLine = '<section class="section" style="padding: 80px 0; background: url(''assets/images/faq-bg.png'') no-repeat center center; background-size: cover;">'
    
    $content = $content -replace [regex]::Escape($oldLine), $newLine
    
    Set-Content -Path $path -Value $content
}
