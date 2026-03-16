// ==UserScript==
// @name         Walgreens RxSense - Coupon Copy Buttons
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds Copy buttons for ID, BIN, GRP, and PCN on the walgreens.rxsense.com large coupon view
// @author       GiveUs20Minutes
// @homepageURL  https://github.com/herebran/wag-rxsense-copy
// @supportURL   https://github.com/herebran/wag-rxsense-copy/issues
// @updateURL    https://raw.githubusercontent.com/herebran/wag-rxsense-copy/main/Walgreens_RxSense_Coupon_Copy_Buttons.user.js
// @downloadURL  https://raw.githubusercontent.com/herebran/wag-rxsense-copy/main/Walgreens_RxSense_Coupon_Copy_Buttons.user.js
// @match        https://walgreens.rxsense.com/*
// @grant        GM.setClipboard
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        /* Turn the number wrap into a CSS grid:
           col 1 = button (auto width)
           col 2 = label (fixed width so all labels align)
           col 3 = value
           Each couponInfoRow is a grid row with 3 cells */
        div[class*="numberWrap"] {
            display: grid !important;
            grid-template-columns: auto 50px 1fr !important;
            align-items: center !important;
            gap: 6px 10px !important;
        }

        /* Each row becomes a grid subgrid spanning all 3 columns */
        div[class*="couponInfoRow"] {
            display: contents !important;
        }

        /* Reduce left margin on the title wrap to accommodate the buttons */
        div[class*="titleWrap"] {
            margin-left: 20px !important;
        }

        /* Remove the per-row margin-right offsets - grid handles alignment */
        span[class*="couponLabel"] {
            margin-right: 0 !important;
            white-space: nowrap !important;
        }

        span[class*="couponValue"] {
            white-space: nowrap !important;
        }

        .rxs-copy-btn {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 3px 10px;
            font-size: 11px;
            font-weight: 700;
            font-family: inherit;
            color: #fff;
            background: #a32a33;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.15s, transform 0.1s;
            letter-spacing: 0.4px;
            white-space: nowrap;
            line-height: 1.6;
            justify-self: start;
        }
        .rxs-copy-btn:hover {
            background: #7a1f26;
        }
        .rxs-copy-btn:active {
            transform: scale(0.95);
        }
        .rxs-copy-btn.rxs-copied {
            background: #2e7d32;
        }
        .rxs-copy-btn svg {
            width: 11px;
            height: 11px;
            flex-shrink: 0;
            fill: currentColor;
        }
    `;
    document.head.appendChild(style);

    const COPY_ICON = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M10 2H3a1 1 0 0 0-1 1v9h1V3h7V2zm3 2H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm0 10H5V5h8v9z"/></svg>`;
    const CHECK_ICON = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 12L2 7.5l1.4-1.4 3.1 3.1 6.1-6.1L14 4.5z"/></svg>`;

    ['copy', 'cut', 'paste', 'contextmenu', 'selectstart'].forEach(evt => {
        document.addEventListener(evt, e => e.stopImmediatePropagation(), true);
    });

    function copyText(value) {
        if (typeof GM_setClipboard !== 'undefined') {
            GM_setClipboard(value, 'text');
            return;
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(value);
            return;
        }
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
    }

    function makeCopyButton(label, valueEl) {
        const btn = document.createElement('button');
        btn.className = 'rxs-copy-btn';
        btn.innerHTML = `${COPY_ICON} COPY ${label}`;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const value = valueEl.innerText.trim();
            console.log(`[RxSense Copy] ${label} = "${value}"`);
            if (!value) return;
            copyText(value);
            btn.innerHTML = `${CHECK_ICON} COPIED!`;
            btn.classList.add('rxs-copied');
            setTimeout(() => {
                btn.innerHTML = `${COPY_ICON} COPY ${label}`;
                btn.classList.remove('rxs-copied');
            }, 1800);
        });

        return btn;
    }

    function injectAll() {
        const labelSpans = document.querySelectorAll('span[class*="couponLabel"]');

        labelSpans.forEach(labelEl => {
            const row = labelEl.parentElement;
            if (!row) return;
            if (row.querySelector('.rxs-copy-btn')) return;

            const valueEl = row.querySelector('span[class*="couponValue"]');
            if (!valueEl) return;

            const label = labelEl.innerText.trim();
            if (!label) return;

            const btn = makeCopyButton(label, valueEl);
            row.insertBefore(btn, labelEl);
        });
    }

    const observer = new MutationObserver(() => injectAll());
    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(injectAll, 500);
    setTimeout(injectAll, 1500);
    setTimeout(injectAll, 3000);

})();
