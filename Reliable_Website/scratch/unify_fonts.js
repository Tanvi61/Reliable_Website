const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const googleFontsSnippet = `    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Add Google Fonts link if not present
    if (!content.includes('fonts.googleapis.com/css2?family=Inter') || !content.includes('family=Manrope')) {
        // Remove old partial Google Fonts if any
        content = content.replace(/<link[^>]*fonts\.googleapis\.com[^>]*>\s*/gi, '');
        content = content.replace(/<link[^>]*fonts\.gstatic\.com[^>]*>\s*/gi, '');
        
        // Insert right before </head> or before <link rel="stylesheet" href="css/style.css">
        if (content.includes('<link rel="stylesheet" href="css/style.css">')) {
            content = content.replace(
                '<link rel="stylesheet" href="css/style.css">',
                `${googleFontsSnippet}\n    <link rel="stylesheet" href="css/style.css">`
            );
            changed = true;
        } else if (content.includes('</head>')) {
            content = content.replace('</head>', `${googleFontsSnippet}\n</head>`);
            changed = true;
        }
    }

    // 2. Fix any inline font-family: serif or improper font families
    if (content.includes('font-family: serif')) {
        content = content.replace(/font-family:\s*serif;?/g, "font-family: 'Manrope', sans-serif;");
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated fonts in ${file}`);
    } else {
        console.log(`No changes needed in ${file}`);
    }
});
