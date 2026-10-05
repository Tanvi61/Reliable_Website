$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\contact.html' -Raw
$content = $content.Replace('#e8efe9', '#f4f9fd')
$content = $content.Replace('#2c5e43', 'var(--accent-orange)')
$content = $content.Replace('#fdfaf6', '#ffffff')
$content = $content.Replace('font-family: serif;', 'font-family: ''Manrope'', sans-serif;')
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\contact.html' -Value $content
