import { isAdmin } from "../utils/auth";

await isAdmin()

const openSidebar = document.querySelector('#openSidebar')
const sidebar = document.querySelector('#sidebar')

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