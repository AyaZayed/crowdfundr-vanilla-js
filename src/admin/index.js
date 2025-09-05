import { isAdmin } from "../utils/auth";
import { getAllUsersExcept } from "../utils/users";
import { getAllCampaigns } from "../utils/campaigns"
import { getAllPledges } from "../utils/pledges"

const VITE_SERVER = import.meta.env.VITE_SERVER

await isAdmin()

const openSidebar = document.querySelector('#openSidebar')
const sidebar = document.querySelector('#sidebar')
const homeNav = document.querySelector('#sidebar #home')
const usersNav = document.querySelector('#sidebar #users')
const campaignsNav = document.querySelector('#sidebar #campaigns')
const pledgesNav = document.querySelector('#sidebar #pledges')
const settingsNav = document.querySelector('#sidebar #settings')
const homeTotalUsers = document.querySelector('.admin__home #homeTotalUsers')
const homeActiveCampaigns = document.querySelector('.admin__home #homeActiveCampaigns')
const homeTotalPledges = document.querySelector('.admin__home #homeTotalPledges')
const homeTotalRewards = document.querySelector('.admin__home #homeTotalRewards')

function toggleSidebar() {
        sidebar && sidebar.classList.toggle('open')
}

openSidebar && openSidebar.addEventListener('click', () => {
        toggleSidebar()
})

window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && (e.key === 'o' || e.key === 'O')) {
                toggleSidebar()
        }
})

function addActiveClass(route, el) {
        if (window.location.href === `${VITE_SERVER}${route}`) {
                el.classList.add('active')
        }
}

addActiveClass('/src/admin/', homeNav)
addActiveClass('/src/admin/users/', usersNav)
addActiveClass('/src/admin/campaigns/', campaignsNav)
addActiveClass('/src/admin/pledges/', pledgesNav)
addActiveClass('/src/admin/settings/', settingsNav)

export const allUsers = await getAllUsersExcept()
export const allCamapaigns = await getAllCampaigns()
export const allPledges = await getAllPledges()
export const allRewards = 0

if (window.location.href === `${VITE_SERVER}/src/admin/`) {
        homeTotalUsers.textContent = allUsers.length;
        homeTotalPledges.textContent = allPledges.length;
        homeActiveCampaigns.textContent = allCamapaigns.length;
        homeTotalRewards.textContent = allRewards.length

        if (allCamapaigns.length !== 0) {
                emptyData.style.display = "flex";
                dataInfo.style.display = "none";
        } else {
                emptyData.style.display = "none";
                dataInfo.style.display = "flex";
        }
}

