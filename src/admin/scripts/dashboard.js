import { isAdmin } from "../../utils/auth"

await isAdmin()

const VITE_SERVER = import.meta.env.VITE_SERVER

const openSidebar = document.querySelector('#openSidebar')
const sidebar = document.querySelector('#sidebar')
const homeNav = document.querySelector('#sidebar #home')
const usersNav = document.querySelector('#sidebar #users')
const campaignsNav = document.querySelector('#sidebar #campaigns')
const pledgesNav = document.querySelector('#sidebar #pledges')
const settingsNav = document.querySelector('#sidebar #settings')

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