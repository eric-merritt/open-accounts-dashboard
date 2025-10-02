// public/js/main.js

// === Modal handling ===
const loginLink = document.getElementById("login-link");
const loginModal = document.getElementById("loginModal");
const closeModalBtn = document.getElementById("closeModal");
const loginForm = document.getElementById("modalForm");

function openModal() {
  loginModal.style.display = "flex";
}

function closeModal() {
  loginModal.style.display = "none";
}

if (loginLink) {
  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    closeModal();
  }
});

// === Handle login form submission ===
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const body = Object.fromEntries(formData);

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        alert("Invalid login");
        return;
      }

      // Server sets cookie — nothing to store in localStorage anymore
      await res.json();

      closeModal();
      window.location.reload(); // reload so header updates based on logged-in state
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed");
    }
  });
}

// === Handle logout ===
const logoutForm = document.getElementById("logout-form");
if (logoutForm) {
  logoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/logout", { method: "POST" });
      if (res.ok) {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Logout failed", err);
      window.location.href = "/";
    }
  });
}