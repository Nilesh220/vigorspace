// VigorSpace - Sheet Integration (With Fallback)
// Stores form data locally if sheet integration isn't configured

const SHEET_BEST_KEY = "74c7727b-bac8-4c0f-b300-d87c593c7625";
const SHEET_ENABLED = false; // Set to true only when Sheet.best is properly configured

// Function to send data to Sheet via Sheet.best
async function submitSectionToSheet(sectionNumber, formData) {
  try {
    // For now, just store locally to avoid errors
    if (!SHEET_ENABLED) {
      console.warn("⚠️ Sheet integration disabled. Storing data locally.");
      return storeLocally(sectionNumber, formData);
    }

    const payload = {
      section: `step${sectionNumber}`,
      timestamp: new Date().toLocaleString(),
      ...formData
    };

    const response = await fetch(
      `https://api.sheetbest.com/sheets/${SHEET_BEST_KEY}`,
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
      console.error(`✗ Sheet error (${response.status}):`, response.statusText);
      // Fallback to local storage
      return storeLocally(sectionNumber, formData);
    }
  } catch(error) {
    console.error("Sheet submission failed, storing locally:", error);
    return storeLocally(sectionNumber, formData);
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
