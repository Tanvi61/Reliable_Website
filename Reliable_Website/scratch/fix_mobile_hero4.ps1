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
                background: transparent !important; 
                backdrop-filter: none !important;
                border-radius: 0 !important;
                padding: 10px !important; 
                box-shadow: none !important;
                z-index: 10 !important;
            }
            .services-hero-title { 
                text-shadow: 0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,1) !important; 
                color: var(--dark-navy) !important; 
                font-size: 2rem !important; 
                margin-bottom: 10px !important; 
            }
            .services-hero-desc { 
                text-shadow: 0 0 10px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,1) !important; 
                color: #111 !important; 
                font-size: 0.95rem !important;
                font-weight: 700 !important;
                margin-bottom: 0 !important;
            }
        }'

$content = [regex]::Replace($content, $pattern, $replacement)
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Value $content
