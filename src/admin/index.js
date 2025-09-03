import { isAdmin } from "../utils/auth";

await isAdmin()

const openSidebar = document.querySelector('#openSidebar')
const sidebar = document.querySelector('#sidebar')

openSidebar && openSidebar.addEventListener('click', () => {
        sidebar && sidebar.classList.toggle('open')
        console.log('sidebar toggled');
})