// Google Apps Script for VigorSpace Creator Database
// Deploy as web app to get deployment URL

const SHEET_ID = "YOUR_GOOGLE_SHEET_ID"; // Replace with your Sheet ID
const SHEET_NAME = "Creator Database";

// Deploy as web app: New > Project > Deploy > New deployment > Type: Web app
// Execute as: Your account | Allow access: Anyone

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const section = data.section; // "step1", "step2", or "step3"
    
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Get or create the row for this email (unique identifier)
    const email = data.email || data.f_email;
    let rowIndex = findOrCreateRow(sheet, email);
    
    // Update sheet based on which section was submitted
    switch(section) {
      case "step1":
        updateStep1(sheet, rowIndex, data);
        break;
      case "step2":
        updateStep2(sheet, rowIndex, data);
        break;
      case "step3":
        updateStep3(sheet, rowIndex, data);
        break;
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: `Section ${section} saved successfully`
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function findOrCreateRow(sheet, email) {
  const data = sheet.getDataRange().getValues();
  
  // Find if email exists
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === email) { // Assuming email is in column B (index 1)
      return i + 1; // Return 1-indexed row number
    }
  }
  
  // If not found, add new row
  sheet.appendRow([]);
  return sheet.getLastRow();
}

function updateStep1(sheet, rowIndex, data) {
  // Step 1: Personal Information
  const values = [
    [
      data.timestamp || new Date().toLocaleString(),
      data.f_email,
      data.f_name,
      data.f_phone,
      data.f_age,
      data.f_gender,
      data.f_city,
      data.f_state,
      data.f_pincode,
      "Step 1 Completed",
      new Date().toLocaleString()
    ]
  ];
  
  const range = sheet.getRange(rowIndex, 1, 1, 11);
  range.setValues(values);
}

function updateStep2(sheet, rowIndex, data) {
  // Step 2: Social Presence
  // Get existing row data first
  const existingRow = sheet.getRange(rowIndex, 1, 1, 20).getValues()[0];
  
  // Update social columns (columns 12-16)
  const values = [
    [
      existingRow[0], existingRow[1], existingRow[2], existingRow[3],
      existingRow[4], existingRow[5], existingRow[6], existingRow[7],
      existingRow[8], existingRow[9], existingRow[10],
      data.f_ig,
      data.f_followers,
      data.f_atype,
      data.f_niche,
      data.f_niche_other || "",
      "Step 2 Completed",
      new Date().toLocaleString()
    ]
  ];
  
  const range = sheet.getRange(rowIndex, 1, 1, 18);
  range.setValues(values);
}

function updateStep3(sheet, rowIndex, data) {
  // Step 3: College Information
  // Get existing row data first
  const existingRow = sheet.getRange(rowIndex, 1, 1, 30).getValues()[0];
  
  // Update college columns (columns 19-25)
  const values = [
    [
      existingRow[0], existingRow[1], existingRow[2], existingRow[3],
      existingRow[4], existingRow[5], existingRow[6], existingRow[7],
      existingRow[8], existingRow[9], existingRow[10],
      existingRow[11], existingRow[12], existingRow[13], existingRow[14],
      existingRow[15], existingRow[16], existingRow[17],
      data.f_college,
      data.f_college_city,
      data.f_college_state,
      data.f_college_pincode,
      data.f_course,
      data.f_year,
      "Application Complete",
      new Date().toLocaleString()
    ]
  ];
  
  const range = sheet.getRange(rowIndex, 1, 1, 25);
  range.setValues(values);
}

function initializeSheet() {
  // Run this once to create headers
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  
  const headers = [
    "Timestamp",
    "Email",
    "Full Name",
    "Phone",
    "Age",
    "Gender",
    "City",
    "State",
    "Pincode",
    "Step 1 Status",
    "Step 1 Completed",
    "Instagram URL",
    "Followers",
    "Profile Type",
    "Content Niche",
    "Other Niche",
    "Step 2 Status",
    "Step 2 Completed",
    "College Name",
    "College City",
    "College State",
    "College Pincode",
    "Course",
    "College Year",
    "Application Status",
    "Final Completed"
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.getRange(1, 1, 1, headers.length).setBackground("#E8435A");
  sheet.getRange(1, 1, 1, headers.length).setFontColor("white");
}
