const emailInput = document.getElementById("gmail");
const passwordInput = document.getElementById("password");
const gmailWarning = document.getElementById("gmail-warning");
const feedback = document.getElementById("feedback");
const strengthBar = document.querySelector(".bar-fill");

function validateAndSubmit() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|sasi\.ac\.in)$/;

  // âœ… Gmail Validation
  if (!emailRegex.test(email)) {
    gmailWarning.textContent = "âŒ The Gmail is not valid. Please enter a valid Gmail address.";
    feedback.textContent = "Password Strength:";
    strengthBar.style.width = "0%";
    return;
  } else {
    gmailWarning.textContent = "";
  }

  // âœ… Password Strength Evaluation
  const username = email.split("@")[0].toLowerCase();
  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[\W_]/.test(password)) score++;

  if (password.toLowerCase().includes(username)) score--;

  let strength = "Very Weak", color = "red", width = "20%";
  if (score >= 5) {
    strength = "Strong"; color = "green"; width = "100%";
  } else if (score >= 3) {
    strength = "Medium"; color = "orange"; width = "70%";
  } else if (score >= 2) {
    strength = "Weak"; color = "orangered"; width = "50%";
  }

  feedback.textContent = "Password Strength: " + strength;
  strengthBar.style.width = width;
  strengthBar.style.backgroundColor = color;
}

// Live password strength feedback
passwordInput.addEventListener("input", validateAndSubmit);