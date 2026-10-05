$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Raw

$pattern = '(?s)@media\(max-width: 768px\) \{.*?\n        \}'

$replacement = '@media(max-width: 768px) {
            .services-hero-exact { 
                height: auto; 
                min-height: 0; 
                display: flex; 
                flex-direction: column; 
            }
            .services-hero-img { 
                height: auto; 
                animation: none; /* Disable zoom on mobile for cleaner look */
            }
            .services-hero-content { 
                position: relative; 
                top: auto; 
                left: auto; 
                transform: none;
                width: 100%;
                max-width: 100%;
                text-align: center; 
                background: #f4f9fd; 
                backdrop-filter: none;
                border-radius: 0;
                padding: 40px 20px; 
            }
            .services-hero-title { text-shadow: none; color: var(--dark-navy); font-size: 2.2rem; margin-bottom: 15px; }
            .services-hero-desc { text-shadow: none; color: #333; }
        }'

$content = [regex]::Replace($content, $pattern, $replacement)
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Value $content
