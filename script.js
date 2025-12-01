// --- Supabase Initialization ---
const supabase = supabase.createClient(
  "https://snltcjivvkfbznmpizjs.supabase.co", // replace with your Supabase URL
  "YOUR-ANON-KEY-HERE" // replace with your regenerated anon key
);

// --- DOM Elements ---
const emailInput = document.getElementById("gmail");
const passwordInput = document.getElementById("password");
const gmailWarning = document.getElementById("gmail-warning");
const feedback = document.getElementById("feedback");
const strengthBar = document.querySelector(".bar-fill");

// --- Gmail Validation ---
function validateGmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|sasi\.ac\.in)$/;
  return regex.test(email);
}

// --- Password Strength Evaluation ---
function evaluatePassword(email, password) {
  const username = email.split("@")[0].toLowerCase();
  let score = 0;
  
  if (password.toLowerCase().includes(username)) score--; // penalize if contains username
  else score += 1;

  if (password.length >= 12) score += 2;
  else if (password.length >= 8) score += 1;

  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[\W_]/.test(password)) score += 1;

  let strength = "Very Weak";
  let color = "red";
  let width = "20%";

  if (score >= 7) { strength = "Excellent"; color = "green"; width = "100%"; }
  else if (score >= 6) { strength = "Very Strong"; color = "limegreen"; width = "90%"; }
  else if (score >= 5) { strength = "Strong"; color = "green"; width = "80%"; }
  else if (score >= 4) { strength = "Moderate"; color = "orange"; width = "60%"; }
  else if (score >= 3) { strength = "Weak"; color = "orangered"; width = "40%"; }

  return { strength, color, width };
}

// --- Update UI ---
function updateUI(strength, color, width) {
  feedback.textContent = "Password Strength: " + strength;
  strengthBar.style.width = width;
  strengthBar.style.backgroundColor = color;
}

// --- Save to Supabase (secure: only store email + strength) ---
async function saveToSupabase(email, strength) {
  const { data, error } = await supabase
    .from("passwords")
    .insert([{ email, strength }]); // safe: no raw password stored

  if (error) {
    console.error(error);
    alert("❌ Failed to save data!");
  } else {
    alert("✅ Data saved successfully!");
  }
}

// --- Main Validation & Submission ---
function validateAndSubmit() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Gmail validation
  if (!validateGmail(email)) {
    gmailWarning.textContent = "❌ Invalid Gmail. Enter gmail.com or sasi.ac.in email.";
    updateUI("Very Weak", "red", "20%");
    return;
  } else {
    gmailWarning.textContent = "";
  }

  // Evaluate password
  const { strength, color, width } = evaluatePassword(email, password);
  updateUI(strength, color, width);

  // Only save if strength is Moderate or higher
  if (["Moderate", "Strong", "Very Strong", "Excellent"].includes(strength)) {
    saveToSupabase(email, strength);
  }
}

// --- Live Feedback ---
passwordInput.addEventListener("input", validateAndSubmit);
emailInput.addEventListener("input", validateAndSubmit);
