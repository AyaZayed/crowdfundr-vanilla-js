import { registerUser } from "../utils/auth"
import { isValidEmail, isValidName, isValidPassword } from "../utils/validation"

const registerForm = document.querySelector('#registerForm')

registerForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        const formData = new FormData(this)

        try {
                await registerUser(formData.get('name'), formData.get('email'), formData.get('password'))
                alert('Added you!')

                const redirectUrl = localStorage.getItem('redirect-url')
                window.location.href = redirectUrl || '/'

        } catch (err) {
                alert(err.message)
        }
})

nameInput.addEventListener('input', async function (e) {
        e.preventDefault()
        const nameVal = this.value
        const msgs = isValidName(nameVal)
        nameErrors.textContent = msgs
})

email.addEventListener('input', async function (e) {
        e.preventDefault()
        const emailVal = this.value
        const msgs = isValidEmail(emailVal)
        emailErrors.textContent = msgs
})

password.addEventListener('input', async function (e) {
        e.preventDefault()
        const passVal = this.value
        const msgs = isValidPassword(passVal)
        passErrors.textContent = msgs
})
