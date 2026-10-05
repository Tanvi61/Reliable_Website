$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Raw

$pattern = '(?s)@media\(max-width: 768px\) \{.*?\}'

$replacement = '@media(max-width: 768px) {
            .services-hero-exact { 
                height: 500px !important; 
                min-height: 500px !important; 
                display: block !important; 
                margin-top: 80px !important;
            }
            .services-hero-img { 
                height: 100% !important; 
                width: 100% !important;
                object-fit: cover !important; 
                object-position: center !important;
                animation: none !important; 
            }
            .services-hero-content { 
                position: absolute !important; 
                top: 50% !important; 
                left: 5% !important; 
                right: 5% !important;
                transform: translateY(-50%) !important;
                width: 90% !important;
                max-width: none !important;
                text-align: center !important; 
                background: rgba(255, 255, 255, 0.8) !important; 
                backdrop-filter: blur(10px) !important;
                border-radius: 12px !important;
                padding: 25px 15px !important; 
                box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
                z-index: 10 !important;
            }
            .services-hero-title { 
                text-shadow: none !important; 
                color: var(--dark-navy) !important; 
                font-size: 2rem !important; 
                margin-bottom: 10px !important; 
            }
            .services-hero-desc { 
                text-shadow: none !important; 
                color: #111 !important; 
                font-size: 0.95rem !important;
                margin-bottom: 0 !important;
            }
        }'

$content = [regex]::Replace($content, $pattern, $replacement)
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Value $content
