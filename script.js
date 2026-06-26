// ==========================
// 🔗 DISCORD WEBHOOKS
// ==========================
const CREATOR_WEBHOOK = "YOUR_CREATOR_WEBHOOK";
const EDITOR_WEBHOOK  = "YOUR_EDITOR_WEBHOOK";

// ==========================
// 📱 MOBILE NAV
// ==========================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// ==========================
// 🎛️ FORM TOGGLING
// ==========================
function openCreator() {
  document.getElementById("creatorForm").classList.remove("hidden");
  document.getElementById("editorForm").classList.add("hidden");
  document.getElementById("btnCreator").classList.add("active");
  document.getElementById("btnEditor").classList.remove("active");
  document.getElementById("creatorForm").scrollIntoView({ behavior: "smooth", block: "center" });
}

function openEditor() {
  document.getElementById("editorForm").classList.remove("hidden");
  document.getElementById("creatorForm").classList.add("hidden");
  document.getElementById("btnEditor").classList.add("active");
  document.getElementById("btnCreator").classList.remove("active");
  document.getElementById("editorForm").scrollIntoView({ behavior: "smooth", block: "center" });
}

// ==========================
// 🧠 HELPERS
// ==========================
function isEmpty(value) {
  return !value || value.trim().length === 0;
}

let toastTimer;
function notify(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toastText");
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.remove("success", "error");
  toast.classList.add(type, "show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}

function setLoading(buttonId, isLoading, idleLabel) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  btn.disabled = isLoading;
  btn.textContent = isLoading ? "Sending..." : idleLabel;
}

function clearFields(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

// ==========================
// 🎥 CREATOR SUBMIT
// ==========================
async function sendCreator() {
  const name = document.getElementById("c_name").value;
  const ig = document.getElementById("c_ig").value;
  const platform = document.getElementById("c_platform").value;
  const style = document.getElementById("c_style").value;
  const budget = document.getElementById("c_budget").value;
  const payment = document.getElementById("c_payment").value;
  const extra = document.getElementById("c_extra").value;

  if (isEmpty(name) || isEmpty(style)) {
    notify("Please fill in name and content style.", "error");
    return;
  }

  const payload = {
    content:
`🎥 **NEW CREATOR REQUEST**
━━━━━━━━━━━━━━━━━━
👤 Name: ${name}
📸 Instagram: ${ig}
📱 Platform: ${platform}
🎬 Style:
${style}
💰 Budget:
${budget}
💳 Payment model:
${payment}
📝 Extra info:
${extra}
━━━━━━━━━━━━━━━━━━`
  };

  setLoading("c_submit", true);

  try {
    await fetch(CREATOR_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    notify("Request sent. We'll be in touch within 24h.", "success");
    clearFields(["c_name", "c_ig", "c_style", "c_budget", "c_extra"]);
  } catch (err) {
    notify("Something went wrong sending your request.", "error");
    console.error(err);
  } finally {
    setLoading("c_submit", false, "Submit request");
  }
}

// ==========================
// ✂️ EDITOR SUBMIT
// ==========================
async function sendEditor() {
  const name = document.getElementById("e_name").value;
  const ig = document.getElementById("e_ig").value;
  const skills = document.getElementById("e_skills").value;
  const price = document.getElementById("e_price").value;
  const payment = document.getElementById("e_payment").value;
  const portfolio = document.getElementById("e_portfolio").value;

  if (isEmpty(name) || isEmpty(skills)) {
    notify("Please fill in name and skills & experience.", "error");
    return;
  }

  const payload = {
    content:
`✂️ **NEW EDITOR APPLICATION**
━━━━━━━━━━━━━━━━━━
👤 Name: ${name}
📸 Instagram: ${ig}
⚡ Skills:
${skills}
💰 Price:
${price}
💳 Payment model:
${payment}
📁 Portfolio:
${portfolio}
━━━━━━━━━━━━━━━━━━`
  };

  setLoading("e_submit", true);

  try {
    await fetch(EDITOR_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    notify("Application sent. We'll be in touch within 24h.", "success");
    clearFields(["e_name", "e_ig", "e_skills", "e_price", "e_portfolio"]);
  } catch (err) {
    notify("Something went wrong sending your application.", "error");
    console.error(err);
  } finally {
    setLoading("e_submit", false, "Submit application");
  }
}
