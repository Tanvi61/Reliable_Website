Add-Type -AssemblyName System.Drawing

$src = 'C:\Users\HP\.gemini\antigravity-ide\brain\7032d499-e7e7-4e05-95f3-cbb13359cde6\.user_uploaded\media_1790956355760.jpg'
$destDir = 'e:\MindAxis_Web\Reliable_Website\assets\images\'
$img = [System.Drawing.Image]::FromFile($src)

function CropImage($x, $y, $w, $h, $filename) {
    # Check boundaries
    if ($x -lt 0) { $x = 0 }
    if ($y -lt 0) { $y = 0 }
    if ($x + $w -gt $img.Width) { $w = $img.Width - $x }
    if ($y + $h -gt $img.Height) { $h = $img.Height - $y }

    $rect = New-Object System.Drawing.Rectangle $x, $y, $w, $h
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    # Save with high quality
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 95)
    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageDecoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid }
    
    $bmp.Save("$destDir$filename", $jpegCodec, $encoderParams)
    $bmp.Dispose()
    Write-Host "Saved $filename"
}

# Image dimensions: 1024 x 682
# Aggressive cropping to remove all white borders.

# Top Row (2 images)
# RTK Drone
CropImage 10 10 495 325 'rtk_drone.jpg'
# LiDAR Drone
CropImage 518 10 495 325 'lidar_drone.jpg'

# Bottom Row (3 images)
# Total Station
CropImage 10 348 322 324 'total_station.jpg'
# DGPS/GNSS
CropImage 348 348 325 324 'dgps.jpg'
# Digital Levels
CropImage 688 348 326 324 'digital_level.jpg'

$img.Dispose()
