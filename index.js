import { getToken } from "./src/utils/auth";

const token = getToken();
localStorage.setItem('redirect-url', window.location.href);

if (token) {
        logoutBtn.style.display = "block";
        loggedOut.style.display = "none";
} else {
        logoutBtn.style.display = "none";
        loggedOut.style.display = "block";
}

const isAdmin = localStorage.getItem("isAdmin")

if (isAdmin === "true") {
        adminBtn.style.display = "block";
} else {
        adminBtn.style.display = "none";
} 