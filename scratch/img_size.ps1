Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('C:\Users\HP\.gemini\antigravity-ide\brain\7032d499-e7e7-4e05-95f3-cbb13359cde6\.user_uploaded\media_1790956355760.jpg')
Write-Host "Width: $($img.Width), Height: $($img.Height)"
$img.Dispose()
