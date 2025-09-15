import Alert from "../scripts/alert"
import { login } from "../utils/auth"

const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        const formData = new FormData(this)

        try {
                await login(formData.get('email'), formData.get('password'))
                await Alert('Logged In!')

                const redirectUrl = localStorage.getItem('redirect-url')

                if (redirectUrl === window.location.href) {
                        window.location.href = '/'
                }
                window.location.href = redirectUrl || '/'

        } catch (err) {
                if (err.message === "Cannot find user") {
                        window.location.href = '/src/register/'
                }
                await Alert(err.message)
        }
})

