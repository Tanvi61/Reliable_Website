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
    
    # 1. Fix the grid container responsiveness (padding and minmax)
    $content = $content -replace "minmax\(300px, 1fr\)", "minmax(min(100%, 300px), 1fr)"
    $content = $content -replace "padding: 40px;", "padding: clamp(20px, 5vw, 40px); overflow: hidden;"
    
    # 2. Fix the table font size to scale down on mobile
    $content = $content -replace "font-size: 0\.95rem;", "font-size: clamp(0.85rem, 3vw, 0.95rem);"
    
    # 3. Fix the h2 title size (Topographical Survey In Pune) so it doesn't overflow
    $content = $content -replace "font-size: 2rem;", "font-size: clamp(1.5rem, 5vw, 2rem);"

    # 4. Make table cells responsive word-break
    $content = $content -replace "td style=`"padding: 12px 0;", "td style=`"padding: 12px 0; word-break: break-word; hyphens: auto;"
    
    Set-Content -Path $path -Value $content
}
