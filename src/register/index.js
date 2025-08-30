const registerForm = document.querySelector('#registerForm')

async function registerUser(name, email, password, role = 'user') {
        const res = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, isActive: 'true', role })
        })

        if (!res.ok) {
                throw Error('Problem with registration, try again!')
        }
        const data = await res.json()
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))

        return data.user
}

registerForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        const formData = new FormData(this)

        try {
                await registerUser(formData.get('name'), formData.get('email'), formData.get('password'))
                alert('Added you!')
        } catch (err) {
                alert(err.message)
        }
})
