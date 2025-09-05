import './styles/main.css';
import './utils/auth.js'
import './utils/campaigns.js'
import './utils/validation.js'
import './utils/users.js'
import './utils/constants.js'
import { platformName } from './utils/constants.js';

// import { getToken } from "./utils/auth.js";
// const token = getToken();

// if (token) {
//         if (logoutBtn && loggedOut) {
//                 logoutBtn.style.display = "block";
//                 loggedOut.style.display = "none";
//         }
// }

const siteName = document.querySelector('#siteName')

if (siteName) siteName.textContent = platformName