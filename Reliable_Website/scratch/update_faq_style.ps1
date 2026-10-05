$files = @(
    "topographical-survey.html",
    "dgps-gnss-control.html",
    "total-station-survey.html",
    "rtk-drone-mapping.html",
    "lidar-3d-scanning.html",
    "cad-gis-processing.html",
    "drone-photogrammetry.html",
    "rail-metro.html",
    "road-highway.html"
)

$newStyle = @"
    <style>
        @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .faq-item {
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 12px;
            margin-bottom: 20px;
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            animation: slideUpFade 0.6s ease-out backwards;
        }
        .faq-item:nth-child(1) { animation-delay: 0.1s; }
        .faq-item:nth-child(2) { animation-delay: 0.2s; }
        .faq-item:nth-child(3) { animation-delay: 0.3s; }
        .faq-item:nth-child(4) { animation-delay: 0.4s; }
        .faq-item:nth-child(5) { animation-delay: 0.5s; }
        .faq-item:nth-child(6) { animation-delay: 0.6s; }
        .faq-item:nth-child(7) { animation-delay: 0.7s; }

        .faq-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
            background: rgba(255, 255, 255, 0.85);
            border-color: rgba(255, 255, 255, 0.8);
        }
        .faq-question {
            padding: 22px 25px;
            font-weight: 800;
            font-size: 1.1rem;
            color: var(--dark-navy);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
        }
        .faq-item.active {
            background: rgba(255, 255, 255, 0.95);
            border-color: var(--accent-orange);
            box-shadow: 0 10px 30px rgba(239, 108, 0, 0.15);
        }
        .faq-item.active .faq-question {
            color: var(--accent-orange);
        }
        .faq-answer {
            padding: 0 25px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), padding 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.5s ease;
            color: #33475b;
            line-height: 1.8;
            font-size: 1.05rem;
            opacity: 0;
        }
        .faq-item.active .faq-answer {
            padding: 0 25px 25px 25px;
            max-height: 500px;
            opacity: 1;
        }
        .faq-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: rgba(239, 108, 0, 0.1);
            color: var(--accent-orange);
            font-size: 1.5rem;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .faq-item.active .faq-icon {
            transform: rotate(135deg);
            background: var(--accent-orange);
            color: #fff;
        }
        .faq-item:hover .faq-icon {
            background: var(--accent-orange);
            color: #fff;
        }
    </style>
"@

foreach ($file in $files) {
    $path = "e:\MindAxis_Web\Reliable_Website\$file"
    $content = Get-Content -Path $path -Raw
    
    # Use Regex to find the old style block and replace it
    $pattern = "(?s)<style>.*?\.faq-icon \{.*?</style>"
    $content = [regex]::Replace($content, $pattern, $newStyle)
    
    Set-Content -Path $path -Value $content
}
