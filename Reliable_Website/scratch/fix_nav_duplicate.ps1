$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Raw

# Remove ALL existing navs
$content = $content -replace '(?s)<nav class="nav-exact anim-nav".*?</nav>', ''

# The correct single Nav HTML
$navHtml = '
    <nav class="nav-exact anim-nav" style="z-index: 20;">
        <div class="nav-logo">
            <img src="assets/logo/logo-transparent.png" alt="Logo">
        </div>
        <div class="nav-links" id="mobileNavMenu">
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="services.html" class="active">Product/Services</a>
            <a href="gallery.html">Gallery</a>
            <a href="contact.html">Contact</a>
        </div>
        <button class="nav-btn" onclick="window.location.href=''contact.html''">Get a Quote &rarr;</button>
        <div class="hamburger-exact" onclick="this.classList.toggle(''active''); document.getElementById(''mobileNavMenu'').classList.toggle(''active'')">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>
'

# Find the end of the top bar and insert nav right after it
# Top bar ends with:
#                     </a>
#                 </div>
#             </div>
#         </div>

$pattern = '(?s)(<div class="top-bar-exact".*?</a>\s*</div>\s*</div>\s*</div>)'
$content = [regex]::Replace($content, $pattern, "`$1`n$navHtml")

Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Value $content
