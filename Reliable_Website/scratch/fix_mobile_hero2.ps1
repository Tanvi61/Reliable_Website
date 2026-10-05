$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Raw

$pattern = '(?s)@media\(max-width: 768px\) \{.*?\}'

$replacement = '@media(max-width: 768px) {
            .services-hero-exact { 
                height: 70vh; 
                min-height: 500px; 
                display: block; 
            }
            .services-hero-img { 
                height: 100%; 
                object-fit: cover; 
                object-position: 50% 50%;
                animation: none; 
            }
            .services-hero-content { 
                position: absolute; 
                top: 55%; 
                left: 5%; 
                right: 5%;
                transform: translateY(-50%);
                width: 90%;
                text-align: center; 
                background: rgba(255, 255, 255, 0.75); 
                backdrop-filter: blur(10px);
                border-radius: 16px;
                padding: 30px 20px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .services-hero-title { 
                text-shadow: none; 
                color: var(--dark-navy); 
                font-size: 2.2rem; 
                margin-bottom: 15px; 
            }
            .services-hero-desc { 
                text-shadow: none; 
                color: #111; 
                font-size: 1rem;
            }
            /* Push hero down on mobile so it is not covered by the white navbar */
            .services-hero-exact {
                margin-top: 80px;
            }
        }'

$content = [regex]::Replace($content, $pattern, $replacement)
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Value $content
