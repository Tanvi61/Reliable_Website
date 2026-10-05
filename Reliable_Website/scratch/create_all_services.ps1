$services = @(
    @{ file="dgps-gnss-control.html"; title="DGPS / GNSS Control"; image="assets/images/highway.jpg" },
    @{ file="total-station-survey.html"; title="Total Station Survey"; image="assets/images/railway.jpg" },
    @{ file="rtk-drone-mapping.html"; title="RTK Drone Mapping"; image="assets/images/drone.jpg" },
    @{ file="lidar-3d-scanning.html"; title="LiDAR 3D Scanning"; image="assets/images/lidar.jpg" },
    @{ file="cad-gis-processing.html"; title="CAD / GIS Processing"; image="assets/images/metro.jpg" },
    @{ file="drone-photogrammetry.html"; title="Drone Photogrammetry"; image="assets/images/drone_photogrammetry.jpg" },
    @{ file="rail-metro.html"; title="Rail / Metro Surveys"; image="assets/images/rail_metro.jpg" },
    @{ file="road-highway.html"; title="Road / Highway Surveys"; image="assets/images/road_highway.jpg" }
)

$template = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\topographical-survey.html' -Raw

foreach ($svc in $services) {
    $content = $template
    
    # Replace Titles
    $content = $content -replace "Topographical Survey In Pune", "$($svc.title) In Pune"
    $content = $content -replace ">Topographical Survey<", ">$($svc.title)<"
    
    # Replace Image
    $content = $content -replace 'src="assets/images/about\.jpg"', "src=`"$($svc.image)`""
    
    # Replace FAQ specific words dynamically
    $content = $content -replace 'What is a topographical survey\?', "What is a $($svc.title)?"
    $content = $content -replace 'need a topographical survey\?', "need a $($svc.title)?"
    $content = $content -replace 'request a topographical survey\?', "request a $($svc.title)?"
    
    Set-Content -Path "e:\MindAxis_Web\Reliable_Website\$($svc.file)" -Value $content
}

# Now update services.html to link to these pages
$servicesHtml = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Raw

foreach ($svc in $services) {
    # Use regex to match the service block and replace 'contact.html' with the new file
    # Pattern looks for the h3 with the title, then non-greedy match to href="contact.html"
    # We have to be careful with regex escaping
    $escTitle = [regex]::Escape($svc.title)
    
    # Note: 'Rail / Metro Surveys' card title is 'Rail / Metro'
    if ($svc.title -eq "Rail / Metro Surveys") { $escTitle = "Rail / Metro" }
    if ($svc.title -eq "Road / Highway Surveys") { $escTitle = "Road / Highway" }

    $pattern = "(?s)(<h3.*?>$escTitle</h3>.*?<a href=)`"contact\.html`""
    $servicesHtml = [regex]::Replace($servicesHtml, $pattern, "`${1}`"$($svc.file)`"")
}

Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Value $servicesHtml

