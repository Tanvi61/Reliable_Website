$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw
$index = $content.IndexOf('four-col-grid')
if ($index -ge 0) {
    $endIndex = $content.IndexOf('>', $index)
    $before = $content.Substring(0, $index - 13)
    $after = $content.Substring($endIndex + 1)
    $replacement = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">'
    $content = $before + $replacement + $after
    Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
}
