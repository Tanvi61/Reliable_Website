$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\css\style.css' -Raw
$content = $content -replace '\.hover-arrow \{ display: inline-block; transition: transform 0\.3s cubic-bezier\(0\.4, 0, 0\.2, 1\); \}', ''
$content = $content -replace 'a:hover \.hover-arrow, button:hover \.hover-arrow, \.btn:hover \.hover-arrow, \.nav-btn:hover \.hover-arrow \{ transform: translateX\(6px\); \}', ''
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\css\style.css' -Value $content
