Add-Type -AssemblyName System.Drawing

$src = 'C:\Users\HP\.gemini\antigravity-ide\brain\7032d499-e7e7-4e05-95f3-cbb13359cde6\.user_uploaded\media_1790956355760.jpg'
$destDir = 'e:\MindAxis_Web\Reliable_Website\assets\images\'
$img = [System.Drawing.Image]::FromFile($src)

function CropImage($x, $y, $w, $h, $filename) {
    $rect = New-Object System.Drawing.Rectangle $x, $y, $w, $h
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $bmp.Save("$destDir$filename", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
    Write-Host "Saved $filename"
}

# Image dimensions: 1024 x 682
# Let's assume white gap is about 8 pixels.
# Middle horizontal line is at y=337 (682/2=341, let's say 337 to 345 is gap)
# Top row y=0, h=337
# Top row middle gap: x=508 to 516 (512 is mid)
CropImage 0 0 508 337 'rtk_drone.jpg'
CropImage 516 0 508 337 'lidar_drone.jpg'

# Bottom row y=345, h=337 (682-345 = 337)
# 1024 / 3 = 341. Gaps at ~337 and ~687
CropImage 0 345 337 337 'total_station.jpg'
CropImage 345 345 334 337 'dgps.jpg'
CropImage 687 345 337 337 'digital_level.jpg'

$img.Dispose()
