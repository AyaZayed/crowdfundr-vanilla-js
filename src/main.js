import './styles/main.css';
import './utils/auth.js'
import './utils/campaigns.js'
import './utils/validation.js'
import './utils/users.js'
import './utils/constants.js'
import { getSiteEmail, getSiteName } from './utils/constants.js';

const siteNames = document.querySelectorAll('#siteName')
const siteEmails = document.querySelectorAll('#siteEmail')


window.addEventListener('load', async () => {
        if (siteNames) {
                siteNames.forEach(async (name) => {
                        name.textContent = await getSiteName()
                })
        }

        if (siteEmails) {
                siteEmails.forEach(async (email) => {
                        email.textContent = await getSiteEmail()
                })
        }
})

localStorage.setItem('redirect-url', window.location.href);


