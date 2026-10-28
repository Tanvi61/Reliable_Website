const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

function generateBreadcrumb(items) {
    let lis = items.map((it, idx) => {
        const isLast = idx === items.length - 1;
        if (isLast) {
            return `<li class="breadcrumb-item active" style="color: var(--accent-orange); font-weight: 800; white-space: nowrap;" aria-current="page">${it.name}</li>`;
        }
        return `<li class="breadcrumb-item"><a href="${it.url}" style="color: #4b5563; text-decoration: none; transition: color 0.2s;">${it.name}</a></li><li aria-hidden="true" style="color: var(--accent-orange);">&raquo;</li>`;
    }).join('');

    return `<nav aria-label="breadcrumb" class="breadcrumb-container" style="margin-bottom: 14px;">
                    <ol class="breadcrumb" style="list-style: none; padding: 0; margin: 0; font-size: 11.5px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        ${lis}
                    </ol>
                </nav>`;
}

// 1. about.html
{
    const fPath = path.join(dir, 'about.html');
    let content = fs.readFileSync(fPath, 'utf8');
    const bc = generateBreadcrumb([
        { name: 'HOME', url: 'index.html' },
        { name: 'ABOUT US', url: '' }
    ]);
    if (!content.includes('aria-label="breadcrumb"')) {
        content = content.replace(
            '<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 20px;">',
            `<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 20px; pointer-events: auto;">\n                ${bc}`
        );
        fs.writeFileSync(fPath, content, 'utf8');
        console.log('Added breadcrumb to about.html');
    }
}

// 2. gallery.html
{
    const fPath = path.join(dir, 'gallery.html');
    let content = fs.readFileSync(fPath, 'utf8');
    const bc = generateBreadcrumb([
        { name: 'HOME', url: 'index.html' },
        { name: 'PROJECT GALLERY', url: '' }
    ]);
    if (!content.includes('aria-label="breadcrumb"')) {
        content = content.replace(
            '<div class="text-fade-in-left" style="max-width: 620px; padding-bottom: 20px; pointer-events: auto;">',
            `<div class="text-fade-in-left" style="max-width: 620px; padding-bottom: 20px; pointer-events: auto;">\n                ${bc}`
        );
        fs.writeFileSync(fPath, content, 'utf8');
        console.log('Added breadcrumb to gallery.html');
    }
}

// 3. review.html
{
    const fPath = path.join(dir, 'review.html');
    let content = fs.readFileSync(fPath, 'utf8');
    const bc = generateBreadcrumb([
        { name: 'HOME', url: 'index.html' },
        { name: 'CLIENT REVIEWS', url: '' }
    ]);
    if (!content.includes('aria-label="breadcrumb"')) {
        content = content.replace(
            '<div class="text-fade-in-left" style="max-width: 620px; padding-bottom: 20px; pointer-events: auto;">',
            `<div class="text-fade-in-left" style="max-width: 620px; padding-bottom: 20px; pointer-events: auto;">\n                ${bc}`
        );
        fs.writeFileSync(fPath, content, 'utf8');
        console.log('Added breadcrumb to review.html');
    }
}
