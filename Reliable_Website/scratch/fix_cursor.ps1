$cssPath = "e:\MindAxis_Web\Reliable_Website\css\style.css"
$content = [System.IO.File]::ReadAllText($cssPath)

$oldPattern = @"
/* ==========================================
   CUSTOM CURSOR
========================================== */
@media (hover: hover) and (pointer: fine) { body, a, button, .nav-btn, .btn { cursor: none !important; } }
.cursor-dot { position: fixed; top: 0; left: 0; width: 6px; height: 6px; background-color: var(--accent-orange); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; z-index: 99999; transition: opacity 0.2s ease; }
.cursor-outline { position: fixed; top: 0; left: 0; width: 36px; height: 36px; border: 1.5px solid var(--accent-orange); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; z-index: 99998; transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease; will-change: left, top, transform; }
.cursor-hover { width: 50px; height: 50px; background-color: rgba(244, 123, 32, 0.1); border-color: rgba(244, 123, 32, 0.5); }
@media (max-width: 768px) { .cursor-dot, .cursor-outline { display: none !important; } }
"@

$newPattern = @"
/* Standard Mouse Cursor & Pointer Controls */
a, button, .btn, .nav-btn, summary, [role="button"], .card, .service-card, .tab-btn {
  cursor: pointer;
}
"@

# Replace normalized
$contentNormalized = $content -replace "\r\n", "`n"
$oldNormalized = $oldPattern -replace "\r\n", "`n"
$newNormalized = $newPattern -replace "\r\n", "`n"

if ($contentNormalized.Contains($oldNormalized)) {
    $updated = $contentNormalized.Replace($oldNormalized, $newNormalized)
    [System.IO.File]::WriteAllText($cssPath, ($updated -replace "`n", "`r\n"))
    Write-Output "Successfully updated style.css"
} else {
    Write-Output "Pattern not found directly, performing regex replace"
    $regex = "(?s)/\* =+[\r\n\s]+CUSTOM CURSOR[\r\n\s]+=+\*/.*?@media \(max-width: 768px\) \{ \.cursor-dot, \.cursor-outline \{ display: none !important; \} \}"
    $updated = [System.Text.RegularExpressions.Regex]::Replace($content, $regex, $newPattern)
    [System.IO.File]::WriteAllText($cssPath, $updated)
    Write-Output "Updated via regex"
}
