// VigorSpace - Google Sheet Integration (CORS-Safe)
// Send form data to Google Sheet after each step using Sheet.best API

// Replace with your Sheet.best key after creating it
const SHEET_BEST_KEY = "YOUR_SHEET_BEST_KEY"; 

// Alternative: Use Google Forms ID (simpler, no CORS issues)
// Instructions: Create a Google Form connected to your sheet, then get form ID

// Function to send data to Sheet via Sheet.best
async function submitSectionToSheet(sectionNumber, formData) {
  try {
    // If using Sheet.best (recommended for CORS safety)
    if (SHEET_BEST_KEY !== "YOUR_SHEET_BEST_KEY") {
      return submitViaSheetBest(sectionNumber, formData);
    }
    
    // Fallback: Store locally until sheet is configured
    console.warn("⚠️ Sheet integration not configured yet. Data stored locally.");
    return storeLocally(sectionNumber, formData);
    
  } catch(error) {
    console.error("Sheet update failed:", error);
    return false;
  }
}

// Send via Sheet.best (handles CORS automatically)
async function submitViaSheetBest(sectionNumber, formData) {
  try {
    const payload = {
      section: `step${sectionNumber}`,
      timestamp: new Date().toLocaleString(),
      ...formData
    };

    const response = await fetch(
      `https://sheet.best/api/sheets/${SHEET_BEST_KEY}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    if (response.ok) {
      console.log(`✓ Step ${sectionNumber} saved to Sheet`);
      return true;
    } else {
      console.error(`✗ Sheet.best error:`, response.statusText);
      return false;
    }
  } catch(error) {
    console.error("Sheet.best submission failed:", error);
    return false;
  }
}

// Store data locally as backup
function storeLocally(sectionNumber, formData) {
  try {
    const allData = JSON.parse(localStorage.getItem("vs-form-data") || "{}");
    allData[`step${sectionNumber}`] = {
      timestamp: new Date().toLocaleString(),
      ...formData
    };
    localStorage.setItem("vs-form-data", JSON.stringify(allData));
    console.log(`✓ Step ${sectionNumber} stored locally`);
    return true;
  } catch(e) {
    console.error("Local storage failed:", e);
    return false;
  }
}

// Function to collect Step 1 data
function getStep1Data() {
  return {
    f_name: document.getElementById("f-name").value.trim(),
    f_email: document.getElementById("f-email").value.trim(),
    f_phone: document.getElementById("f-phone").value.trim(),
    f_age: document.getElementById("f-age").value.trim(),
    f_gender: document.getElementById("f-gender").value.trim(),
    f_city: document.getElementById("f-city").value.trim(),
    f_state: document.getElementById("f-state").value.trim(),
    f_pincode: document.getElementById("f-pincode").value.trim()
  };
}

// Function to collect Step 2 data
function getStep2Data() {
  return {
    f_email: document.getElementById("f-email").value.trim(),
    f_ig: document.getElementById("f-ig").value.trim(),
    f_followers: document.getElementById("f-followers").value.trim(),
    f_atype: document.getElementById("f-atype").value.trim(),
    f_niche: document.getElementById("f-niche").value.trim(),
    f_niche_other: document.getElementById("f-niche-other").value.trim()
  };
}

// Function to collect Step 3 data
function getStep3Data() {
  return {
    f_email: document.getElementById("f-email").value.trim(),
    f_college: document.getElementById("f-college").value.trim(),
    f_college_city: document.getElementById("f-college-city").value.trim(),
    f_college_state: document.getElementById("f-college-state").value.trim(),
    f_college_pincode: document.getElementById("f-college-pincode").value.trim(),
    f_course: document.getElementById("f-course").value.trim(),
    f_year: document.getElementById("f-year").value.trim()
  };
}

// Hook into existing next/submit buttons
function setupSheetIntegration() {
  const next1Btn = document.getElementById("next-1");
  const next2Btn = document.getElementById("next-2");
  const submitBtn = document.getElementById("submitBtn");

  if (next1Btn) {
    next1Btn.addEventListener("click", async (e) => {
      // Let validation happen first, then save
      setTimeout(() => {
        submitSectionToSheet(1, getStep1Data());
      }, 100);
    });
  }

  if (next2Btn) {
    next2Btn.addEventListener("click", async (e) => {
      setTimeout(() => {
        submitSectionToSheet(2, getStep2Data());
      }, 100);
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", async (e) => {
      setTimeout(() => {
        submitSectionToSheet(3, getStep3Data());
      }, 100);
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupSheetIntegration);
} else {
  setupSheetIntegration();
}

console.log("📊 VigorSpace Sheet Integration loaded");
