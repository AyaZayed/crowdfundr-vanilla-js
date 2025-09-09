import './styles/main.css';
import './utils/auth.js'
import './utils/campaigns.js'
import './utils/validation.js'
import './utils/users.js'
import './utils/constants.js'
import { platformName } from './utils/constants.js';

const siteName = document.querySelector('#siteName')

if (siteName) siteName.textContent = platformName