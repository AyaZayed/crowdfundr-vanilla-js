import { login } from "../utils/auth"
import { isValidEmail, isValidPassword } from "../utils/validation"

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

// email.addEventListener('input', async function (e) {
//         e.preventDefault()
//         const emailVal = this.value
//         const msgs = isValidEmail(emailVal)
//         emailErrors.textContent = msgs
// })

// password.addEventListener('input', async function (e) {
//         e.preventDefault()
//         const passVal = this.value
//         const msgs = isValidPassword(passVal)
//         passErrors.textContent = msgs
// })

