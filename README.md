<p align="center">
  <img src="https://walgreens.rxsense.com/images/Walgreens_logo_with_rx.png" alt="Walgreens Rx Savings Finder" width="500"/>
  <br/>
  <strong>Coupon Copy Button Userscript</strong>
</p>

A Tampermonkey userscript that adds individual copy buttons for the BIN, PCN, Group, and Member ID fields on the Walgreens RxSense drug coupon card - because the site disables copy/paste by default and typing those fields out manually is slow and inefficient.

---

## Why This Script Exists

Walgreens pharmacy technicians and pharmacists regularly use the [Walgreens Rx Savings Finder](https://walgreens.rxsense.com/) to look up drug discount coupon pricing for patients. When a coupon is found, the card displays four key fields that need to be entered into **IC+ patient profiles** to process a claim:

- **BIN** - Bank Identification Number
- **PCN** - Processor Control Number **(Auto-populates in IC+)**
- **GRP** - Group Number
- **ID** - Member ID

The problem is that the RxSense website blocks copy/paste on the coupon card by default unlike GoodRx. This forces technicians and pharmacists to manually read each value off the screen and type it into IC+ one character at a time - which is slow and inefficient during busy hours.

This script solves that by injecting a **Copy** button next to each field. One click copies the value directly to your clipboard, ready to paste into IC+ patient profiles.

## Screenshots
 
| Before | After |
|:------:|:-----:|
| <img src="https://i.ibb.co/j9zgvYYk/2026-03-17-01-46-59.png" alt="Before - default coupon card with no copy buttons" width="420"/> | <img src="https://i.ibb.co/mFRnV7Gm/2026-03-17-01-42-22.png" alt="After - coupon card with copy buttons injected" width="420"/> |

## Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension for Chrome, Firefox, or Edge
2. **Important:** After installing Tampermonkey, go to your browser's extension settings, find Tampermonkey, and make sure **Allow User Scripts** is enabled — without this, the script will not run
3. Click this link to install the script directly: [Install Script](https://raw.githubusercontent.com/herebran/wag-rxsense-copy/main/Walgreens_RxSense_Coupon_Copy_Buttons.user.js)
4. Tampermonkey will open a confirmation page — click **Install**
5. Navigate to [walgreens.rxsense.com](https://walgreens.rxsense.com/), search for a drug, and open a coupon
6. Click **Change coupon view** to switch to the large card view — the copy buttons will appear automatically

## How to Use

1. Search for a drug on the Walgreens Rx Savings Finder as you normally would
2. Click the coupon to open the coupon modal
3. If the coupon is showing as an image, click **Change coupon view** to switch to the text card
4. You will see **COPY** buttons next to each field (ID, BIN, GRP, PCN)
5. Click the button for the field you need — the value is now in your clipboard
6. Paste directly into the corresponding field in IC+

## Disclaimer

This script is an unofficial browser tool and is not affiliated with, endorsed by, or supported by Walgreens, RxSense, or any related company. It is intended solely to improve the workflow of pharmacy staff by restoring basic clipboard functionality that is disabled by default on the site. Use at your own discretion.
