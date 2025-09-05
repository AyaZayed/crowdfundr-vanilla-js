import { login } from "../utils/auth"

const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        const formData = new FormData(this)

        try {
                await login(formData.get('email'), formData.get('password'))
                alert('Logged In!')

                const redirectUrl = localStorage.getItem('redirect-url')

                window.location.href = redirectUrl || '/'
        } catch (err) {
                alert(err.message)
        }
})

