$files = @(
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
    
    $oldLine = '<section class="section" style="padding: 60px 0; background-color: #f8f9fa;">'
    $newLine = '<section class="section" style="padding: 80px 0; background: url(''assets/images/topo-bg.png'') no-repeat center center; background-size: cover; position: relative;">'
    
    $content = $content -replace [regex]::Escape($oldLine), $newLine
    
    Set-Content -Path $path -Value $content
}
