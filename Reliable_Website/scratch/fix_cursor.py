with open(r"e:\MindAxis_Web\Reliable_Website\css\style.css", "r", encoding="utf-8") as f:
    content = f.read()

target = """/* ==========================================
   CUSTOM CURSOR
========================================== */
@media (hover: hover) and (pointer: fine) { body, a, button, .nav-btn, .btn { cursor: none !important; } }
.cursor-dot { position: fixed; top: 0; left: 0; width: 6px; height: 6px; background-color: var(--accent-orange); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; z-index: 99999; transition: opacity 0.2s ease; }
.cursor-outline { position: fixed; top: 0; left: 0; width: 36px; height: 36px; border: 1.5px solid var(--accent-orange); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; z-index: 99998; transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease; will-change: left, top, transform; }
.cursor-hover { width: 50px; height: 50px; background-color: rgba(244, 123, 32, 0.1); border-color: rgba(244, 123, 32, 0.5); }
@media (max-width: 768px) { .cursor-dot, .cursor-outline { display: none !important; } }"""

replacement = """/* Interactive standard cursor pointers */
a, button, .btn, .nav-btn, summary, [role="button"], .tab-btn {
  cursor: pointer;
}"""

# Check CRLF vs LF
if target in content:
    content = content.replace(target, replacement)
elif target.replace("\r\n", "\n") in content.replace("\r\n", "\n"):
    # Normalize and replace
    lines = content.splitlines()
    new_lines = []
    skip = False
    for line in lines:
        if "CUSTOM CURSOR" in line:
            skip = True
        elif skip and "cursor-outline { display: none !important; } }" in line:
            skip = False
            new_lines.append(replacement)
            continue
        elif skip and line.startswith("/* ====="):
            # start comment line before custom cursor
            continue
        elif not skip:
            new_lines.append(line)
    content = "\n".join(new_lines)

with open(r"e:\MindAxis_Web\Reliable_Website\css\style.css", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated style.css successfully!")
