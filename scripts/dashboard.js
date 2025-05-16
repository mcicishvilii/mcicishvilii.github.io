import { fetchProfile, refreshToken } from "./auth.js";

async function initializeDashboard() {
  try {
    await refreshToken();
    await fetchProfile();
  } catch (e) {
    localStorage.clear();
    window.location.href = "index.html";
  }
  // Set up logout handler
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      const access_token = localStorage.getItem("access_token");
      try {
        if (access_token) {
          await fetch("https://ladogudi.serv00.net/api/logout", {
            method: "POST",
            headers: { Authorization: `Bearer ${access_token}` },
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        localStorage.clear();
        window.location.href = "index.html";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeDashboard);
