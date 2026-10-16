const fs = require('fs');
const path = require('path');

function updateReliableWebContact(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Make backup
    fs.writeFileSync(filePath + '.bak', content, 'utf8');
    console.log('Backup created:', filePath + '.bak');

    const captchaHTML = `
                        <!-- Security Captcha Verification Section (QA Item 27) -->
                        <div class="reliable-captcha-section" style="margin-top: 20px; padding: 18px; background: #f8fafc; border: 1.5px solid #d5e2ef; border-radius: 12px; box-shadow: 0 2px 10px rgba(8, 43, 76, 0.04);">
                            <label class="contact-label" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; font-weight: 700; color: #082b4c; font-size: 14.5px;">
                                <span style="display: flex; align-items: center; gap: 6px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#082b4c" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    Security Verification <span style="color: #ef4444;">*</span>
                                </span>
                                <span style="font-size: 11.5px; font-weight: 600; color: #64748b; background: #e2e8f0; padding: 2px 8px; border-radius: 4px;">Anti-Spam Verification</span>
                            </label>

                            <!-- Dual Captcha Container -->
                            <div style="display: flex; flex-direction: column; gap: 14px;">
                                <!-- 1. Alphanumeric Security Code Box -->
                                <div>
                                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px; flex-wrap: wrap;">
                                        <!-- Captcha Display Badge -->
                                        <div id="captchaCodeBadge" style="user-select: none; -webkit-user-select: none; background: linear-gradient(135deg, #082b4c, #123f68); color: #ffffff; font-family: 'Courier New', Courier, monospace; font-size: 22px; font-weight: 800; letter-spacing: 6px; padding: 10px 18px; border-radius: 8px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5); text-decoration: line-through; position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; min-width: 145px; box-shadow: inset 0 2px 5px rgba(0,0,0,0.3); border: 1.5px dashed #f47b20;">
                                            <span id="captchaCodeText">7W3K9</span>
                                        </div>
                                        <!-- Refresh Button -->
                                        <button type="button" id="btnRefreshCaptcha" title="Generate New Captcha Code" aria-label="Refresh Security Code" style="background: #ffffff; border: 1.5px solid #d5e2ef; color: #082b4c; width: 46px; height: 46px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.25s ease; box-shadow: 0 2px 6px rgba(8, 43, 76, 0.06);">
                                            <svg id="captchaRefreshIcon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.4s ease;"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                                        </button>
                                        <span style="font-size: 12px; color: #64748b; line-height: 1.3;">Click ↻ if code is unclear</span>
                                    </div>
                                    <input type="text" id="contactCaptchaInput" name="captcha_code" class="contact-input-field" placeholder="Type the 5 characters shown above" maxlength="6" autocomplete="off" required style="text-transform: uppercase; font-weight: 700; letter-spacing: 2.5px; font-size: 15px;">
                                </div>

                                <!-- 2. 'I am not a robot' reCAPTCHA Checkbox Card -->
                                <div id="recaptchaCard" style="display: flex; align-items: center; justify-content: space-between; background: #ffffff; border: 1.5px solid #d1d5db; border-radius: 8px; padding: 12px 16px; box-shadow: 0 1px 5px rgba(0,0,0,0.06); user-select: none;">
                                    <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; margin: 0; font-size: 14.5px; font-weight: 600; color: #1e293b;">
                                        <input type="checkbox" id="robotCheck" style="width: 22px; height: 22px; cursor: pointer; accent-color: #082b4c;">
                                        <span>I'm not a robot</span>
                                    </label>
                                    <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 2px;">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#082b4c" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                        <span style="font-size: 9.5px; font-weight: 800; color: #475569; letter-spacing: 0.5px;">reCAPTCHA</span>
                                        <span style="font-size: 8.5px; color: #94a3b8;">Privacy - Terms</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Captcha Validation Error Notice -->
                            <div id="captchaError" style="display: none; margin-top: 12px; padding: 10px 14px; border-radius: 8px; background: #fef2f2; border: 1.5px solid #f87171; color: #b91c1c; font-size: 13.5px; font-weight: 600; align-items: center; gap: 8px;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                <span id="captchaErrorMsg">Please complete the captcha verification.</span>
                            </div>
                        </div>
`;

    // Normalizing newlines
    const targetHTML = `<button type="submit" id="contactSubmitBtn"`;
    if (!content.includes(targetHTML)) {
        console.error('Submit button target not found in', filePath);
        return false;
    }

    // Insert captcha before the submit button container div
    const submitContainerRegex = /<div style="margin-top:\s*18px;">\s*<button type="submit" id="contactSubmitBtn"/i;
    if (submitContainerRegex.test(content)) {
        content = content.replace(submitContainerRegex, (match) => {
            return captchaHTML + '\n\n                        ' + match;
        });
        console.log('Injected Captcha HTML before submit button in', filePath);
    } else {
        console.error('Submit container regex failed in', filePath);
        return false;
    }

    // Insert script logic
    const scriptTarget = "var form = document.getElementById('contactForm');";
    const captchaScript = `// Captcha State & Logic (QA Item 27)
        var currentCaptchaCode = '';
        var captchaTextEl = document.getElementById('captchaCodeText');
        var captchaInputEl = document.getElementById('contactCaptchaInput');
        var refreshBtn = document.getElementById('btnRefreshCaptcha');
        var refreshIcon = document.getElementById('captchaRefreshIcon');
        var robotCheck = document.getElementById('robotCheck');
        var captchaError = document.getElementById('captchaError');
        var captchaErrorMsg = document.getElementById('captchaErrorMsg');

        function generateCaptcha() {
            var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            var code = '';
            for (var i = 0; i < 5; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            currentCaptchaCode = code;
            if (captchaTextEl) {
                captchaTextEl.textContent = code;
            }
            if (captchaInputEl) {
                captchaInputEl.value = '';
                captchaInputEl.style.borderColor = '#d5e2ef';
            }
            if (captchaError) {
                captchaError.style.display = 'none';
            }
        }

        function showCaptchaError(msg) {
            if (captchaError && captchaErrorMsg) {
                captchaErrorMsg.textContent = msg;
                captchaError.style.display = 'flex';
                captchaError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        generateCaptcha();

        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                if (refreshIcon) {
                    refreshIcon.style.transform = 'rotate(360deg)';
                    setTimeout(function() {
                        refreshIcon.style.transform = 'none';
                    }, 400);
                }
                generateCaptcha();
            });
        }

        var form = document.getElementById('contactForm');`;

    if (content.includes(scriptTarget)) {
        content = content.replace(scriptTarget, captchaScript);
        console.log('Injected Captcha script logic into', filePath);
    } else {
        console.error('Script target not found in', filePath);
        return false;
    }

    // Insert validation check right at beginning of form.addEventListener('submit', function(e) {
    const submitListenerTarget = "form.addEventListener('submit', function(e) {\n            e.preventDefault();";
    const validationCheck = `form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Captcha Verification Checks
            if (captchaInputEl) {
                var userCode = captchaInputEl.value.trim().toUpperCase();
                if (!userCode) {
                    showCaptchaError('Please enter the 5-character security code.');
                    captchaInputEl.style.borderColor = '#ef4444';
                    captchaInputEl.focus();
                    return;
                }
                if (userCode !== currentCaptchaCode) {
                    showCaptchaError('Security code does not match. A new code has been generated. Please try again.');
                    captchaInputEl.style.borderColor = '#ef4444';
                    generateCaptcha();
                    captchaInputEl.focus();
                    return;
                }
            }

            if (robotCheck && !robotCheck.checked) {
                showCaptchaError('Please check the "I\\'m not a robot" security box.');
                robotCheck.focus();
                return;
            }

            if (captchaError) {
                captchaError.style.display = 'none';
            }`;

    if (content.includes(submitListenerTarget)) {
        content = content.replace(submitListenerTarget, validationCheck);
        console.log('Injected submit validation check into', filePath);
    } else {
        // Try with CRLF
        const crlfTarget = "form.addEventListener('submit', function(e) {\r\n            e.preventDefault();";
        if (content.includes(crlfTarget)) {
            content = content.replace(crlfTarget, validationCheck);
            console.log('Injected submit validation check (CRLF) into', filePath);
        } else {
            console.error('Submit listener target not found in', filePath);
            return false;
        }
    }

    // Reset captcha on form success
    const resetTarget = "form.reset();";
    if (content.includes(resetTarget)) {
        content = content.replace(resetTarget, "form.reset();\n                generateCaptcha();\n                if (robotCheck) robotCheck.checked = false;");
        console.log('Injected reset call into', filePath);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully written updated file:', filePath);
    return true;
}

// Execute on E:\MindAxis_Web\Reliable_Website\contact.html
updateReliableWebContact('E:\\MindAxis_Web\\Reliable_Website\\contact.html');
