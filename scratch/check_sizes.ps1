Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('e:\MindAxis_Web\Reliable_Website\assets\images\dgps_new.png')
Write-Host "DGPS: $($img.Width) x $($img.Height)"
$img.Dispose()
$img2 = [System.Drawing.Image]::FromFile('e:\MindAxis_Web\Reliable_Website\assets\images\digital_level_new.png')
Write-Host "Level: $($img2.Width) x $($img2.Height)"
$img2.Dispose()
