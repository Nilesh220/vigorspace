// VigorSpace - Apps Script Integration
// Send form data to Google Sheet after each step

const APPS_SCRIPT_URL = "YOUR_DEPLOYMENT_URL"; // Replace after deploying Apps Script

// Function to send data to Apps Script
async function submitSectionToSheet(sectionNumber, formData) {
  try {
    const payload = {
      section: `step${sectionNumber}`,
      timestamp: new Date().toLocaleString(),
      ...formData
    };

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    
    if (result.status === "success") {
      console.log(`✓ Step ${sectionNumber} saved to Sheet:`, result.message);
      return true;
    } else {
      console.error(`✗ Error saving Step ${sectionNumber}:`, result.message);
      return false;
    }
  } catch(error) {
    console.error("Sheet update failed:", error);
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
