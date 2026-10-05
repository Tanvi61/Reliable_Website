$files = Get-ChildItem "e:\MindAxis_Web\Reliable_Website\*.html"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Update for index.html which has the exact link string
    $content = $content -replace 'style="color: var\(--accent-orange\) !important; text-decoration: none;">MindAxis', 'style="color: #fff !important; text-decoration: none;">MindAxis'
    
    # For pages that just have text: <p>Developed by <strong>MindAxis Innovation Pvt.Ltd</strong></p>
    # We will replace them with a link that is white
    $oldText = '<p>Developed by <strong>MindAxis Innovation Pvt.Ltd</strong></p>'
    $newText = '<p>Developed by <strong><a href="https://mindaxisinnovation.com/" target="_blank" style="color: #fff !important; text-decoration: none;">MindAxis Innovation Pvt.Ltd</a></strong></p>'
    $content = $content -replace [regex]::Escape($oldText), $newText

    Set-Content $file.FullName -Value $content
}
