import Alert from "../scripts/alert"
import { registerUser } from "../utils/auth"
import { isValidEmail, isValidMatchPass, isValidName, isValidPassword } from "../utils/validation"

const registerForm = document.querySelector('#registerForm')

registerForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        if (!isValidSubmission()) {
                return
        }
        const formData = new FormData(this)

        try {
                await registerUser(formData.get('name'), formData.get('email'), formData.get('password'))
                await Alert('Added you!')

                const redirectUrl = localStorage.getItem('redirect-url')
                window.location.href = redirectUrl || '/'
        } catch (err) {
                if (err.message === "Bad Request") {
                        await Alert('User already exists!')
                        window.location.href = '/src/login/'
                }
                await Alert(err.message)
        }
})

registerForm.addEventListener('change', async function (e) {
        if (e.target.id === 'name') {
                const msgs = isValidName(e.target.value)
                nameErrors.textContent = msgs
        } if (e.target.id === 'email') {
                const msgs = isValidEmail(e.target.value)
                emailErrors.textContent = msgs
        }
        if (e.target.id === 'password') {
                const msgs = isValidPassword(e.target.value)
                passErrors.textContent = msgs
        }
        if (e.target.id === 'matchPassword') {
                const msgs = isValidMatchPass(e.target.value, password.value)
                matchPassErrors.textContent = msgs
        }
})

function isValidSubmission() {
        emailErrors.textContent = isValidEmail(email.value)
        nameErrors.textContent = isValidName(nameInput.value)
        passErrors.textContent = isValidPassword(password.value)
        matchPassErrors.textContent = isValidMatchPass(matchPassword.value, password.value)

        if (
                emailErrors.textContent ||
                nameErrors.textContent ||
                passErrors.textContent ||
                matchPassErrors.textContent
        ) {
                return false
        }
        return true
}