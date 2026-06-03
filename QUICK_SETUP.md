# VigorSpace Sheet Integration — Quick Setup (Sheet.best)

## ⚡ Why Sheet.best?
- ✅ No CORS errors
- ✅ 1-minute setup
- ✅ Free tier available
- ✅ Auto-updates your Google Sheet

---

## Setup Steps

### 1. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new blank sheet
3. Name it: **"Creator Database"**
4. Add these headers in Row 1:
   ```
   Timestamp | Email | Full Name | Phone | Age | Gender | City | State | Pincode | 
   Instagram URL | Followers | Profile Type | Content Niche | College Name | 
   College City | College State | Course | College Year | Status
   ```

### 2. Get Your Sheet.best Key
1. Go to [Sheet.best](https://sheet.best)
2. Click **"Get Started"**
3. Paste your Google Sheet URL
4. Click **"Create"**
5. Copy the **API Key** displayed
   - Example: `abc123def456ghi789jkl`

### 3. Update Your Code
1. Open `sheet-integration.js`
2. Find Line 5:
   ```javascript
   const SHEET_BEST_KEY = "YOUR_SHEET_BEST_KEY";
   ```
3. Replace `YOUR_SHEET_BEST_KEY` with your actual key:
   ```javascript
   const SHEET_BEST_KEY = "abc123def456ghi789jkl";
   ```
4. Save & commit:
   ```bash
   git add sheet-integration.js
   git commit -m "Add Sheet.best API key"
   git push
   ```

---

## Test It

1. Visit your live site
2. Fill out the application form
3. Submit Step 1
4. Check your Google Sheet — data should appear instantly! ✅

---

## Troubleshooting

### Data not appearing?
- Open browser DevTools (F12)
- Go to **Console** tab
- Look for error messages
- Check your API key is correct

### Getting CORS error in console?
- Double-check your API key
- Make sure your Google Sheet is shared (at least edit access)

### Still not working?
- Open DevTools → **Network** tab
- Try submitting again
- Look for the POST request to `sheet.best`
- Check response status

---

## File Structure
```
VigorSpace/
├── Index.html
├── sheet-integration.js (with your API key)
└── QUICK_SETUP.md (this file)
```

---

That's it! Your creator form is now connected to your Google Sheet. 🎉
