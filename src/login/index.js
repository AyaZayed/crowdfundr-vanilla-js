import Alert from "../scripts/alert"
import { login } from "../utils/auth"
import { isNotEmpty, isValidEmail } from "../utils/validation"

const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', async function (e) {
        e.preventDefault()

        if (!isValidSubmission()) {
                return
        }

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

loginForm.addEventListener('change', async function (e) {
        if (e.target.id === 'email') {
                const msgs = isValidEmail(e.target.value)
                emailErrors.textContent = msgs
        }
        if (e.target.id === 'password') {
                const msgs = isNotEmpty(e.target.value, "Password")
                nameErrors.textContent = msgs
        }
})

function isValidSubmission() {
        emailErrors.textContent = isValidEmail(email.value)
        passErrors.textContent = isNotEmpty(password.value, "Password")

        if (emailErrors.textContent || passErrors.textContent) {
                return false
        }
        return true
}