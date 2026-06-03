# VigorSpace Google Apps Script Setup Guide

## 📋 Overview
This guide will help you integrate the VigorSpace creator application form with a Google Sheet using Google Apps Script.

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ New"** → **"Blank spreadsheet"**
3. Name it: **"Creator Database"** (or your preferred name)
4. Copy the **Sheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
   - Example: `https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit`
   - Your Sheet ID: `1A2B3C4D5E6F7G8H9I0J`

---

## Step 2: Create the Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"Create new project"**
3. Name it: **"VigorSpace Sheet API"**
4. **Delete** the default `function myFunction() {}` code
5. **Copy-paste** the entire content from `apps-script.gs` into the editor
6. Update Line 3 with your Sheet ID:
   ```javascript
   const SHEET_ID = "YOUR_SHEET_ID_HERE";
   ```
7. Replace `YOUR_SHEET_ID_HERE` with the ID you copied above

---

## Step 3: Initialize the Sheet Headers

1. In the Apps Script editor, click **"Run"** (top menu)
2. Select **`initializeSheet`** function
3. Click the play button ▶️
4. Grant permissions when prompted
5. Check your Google Sheet - it should now have headers in row 1 (pink background)

---

## Step 4: Deploy as Web App

1. In Apps Script, click **"Deploy"** → **"New Deployment"**
2. Select **Type**: "Web app"
3. **Execute as**: Your account
4. **Who has access**: "Anyone"
5. Click **"Deploy"**
6. Copy the **Deployment URL**
   - Example: `https://script.google.com/macros/s/ABC123XYZ789/usercontent`
7. Click **"Authorize access"** if prompted

---

## Step 5: Update the HTML File

1. Open `Index.html` in your editor
2. Find this line near the bottom (or add it before `</body>`):
   ```html
   <script src="sheet-integration.js"></script>
   ```
3. Make sure this line is present

---

## Step 6: Update sheet-integration.js

1. Open `sheet-integration.js`
2. Find Line 5:
   ```javascript
   const APPS_SCRIPT_URL = "YOUR_DEPLOYMENT_URL";
   ```
3. Replace `YOUR_DEPLOYMENT_URL` with the URL from Step 4
4. Save the file

---

## Step 7: Add Script to HTML

In `Index.html`, add this line just before the closing `</body>` tag:

```html
<script src="sheet-integration.js"></script>
```

---

## Testing

1. Deploy your site to Vercel (push to GitHub)
2. Visit your live site
3. Fill out a test application
4. Submit Step 1
5. Check your Google Sheet - the data should appear!

---

## What Happens

- **Step 1 completion** → Personal info is saved to Sheet
- **Step 2 completion** → Social presence data is added to the same row
- **Step 3 completion** → College info is added, marking application as complete

Each creator's data is stored in a single row, identified by their email address.

---

## Troubleshooting

### Data not appearing in Sheet?
- ✓ Check SHEET_ID is correct (Line 3 of apps-script.gs)
- ✓ Check APPS_SCRIPT_URL is correct (Line 5 of sheet-integration.js)
- ✓ Open browser DevTools (F12) → Console tab
- ✓ Look for error messages

### "Permissions denied" error?
- Go back to Apps Script
- Click the small gear icon (Settings)
- Check "Show `appsscript.json` manifest file"
- Add this to scopes in manifest:
  ```json
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets"
  ]
  ```

### Headers not created?
- Run `initializeSheet()` manually again
- Check that you have edit access to the Sheet

---

## File Structure

```
VigorSpace/
├── Index.html (main form)
├── sheet-integration.js (frontend handler)
├── apps-script.gs (backend - deploy to Apps Script)
└── SETUP.md (this file)
```

---

## Security Note

- Your Sheet ID is visible in the code (considered public)
- The Apps Script deployment URL is public
- Anyone can submit to your sheet, so consider adding validation or authentication if needed

---

## Next Steps

1. Test thoroughly with different browsers
2. Set up email notifications when forms are submitted
3. Create more sheets for different data (e.g., "Approved Creators", "Matches", etc.)

---

**Need help?** Check the browser console for real-time debugging!
