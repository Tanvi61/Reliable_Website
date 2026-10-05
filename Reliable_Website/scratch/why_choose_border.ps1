$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw
$pattern = '(?s)\.feature-card \{.*?z-index: 1;\s*\}'
$replacement = '.feature-card {
                background: #ffffff;
                padding: 45px 30px;
                border-radius: 16px;
                border: 1px solid rgba(18, 63, 104, 0.1);
                box-shadow: 0 15px 35px rgba(0,0,0,0.08);
                text-align: center;
                transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
                z-index: 1;
            }'
$content = [regex]::Replace($content, $pattern, $replacement)
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
