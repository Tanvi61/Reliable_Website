import re

with open('e:/MindAxis_Web/Reliable_Website/index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract top bar from index.html
top_bar_match = re.search(r'(<!-- ==========================================\s*TOP BAR\s*========================================== -->\s*<div class="top-bar-exact">.*?</div>\s*</div>\s*</div>)', index_content, re.DOTALL)
top_bar_html = top_bar_match.group(1) if top_bar_match else ""

with open('e:/MindAxis_Web/Reliable_Website/about.html', 'r', encoding='utf-8') as f:
    about_content = f.read()

# Extract nav from about.html
nav_match = re.search(r'(<nav class="nav-exact anim-nav">.*?</nav>)', about_content, re.DOTALL)
nav_html = nav_match.group(1) if nav_match else ""

if nav_html:
    # Remove old nav from about.html
    about_content = about_content.replace(nav_html, '')
    
    # Insert top bar and nav right after <body>
    replacement = f"<body>\n\n    {top_bar_html}\n\n    {nav_html}\n"
    about_content = about_content.replace('<body>', replacement)
    
    with open('e:/MindAxis_Web/Reliable_Website/about.html', 'w', encoding='utf-8') as f:
        f.write(about_content)
    print("Success")
else:
    print("Failed to find nav in about.html")
