const loginForm = document.querySelector('#loginForm')

async function login(email, password) {
        const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
        })

        if (!res.ok) {
                const err = await res.json();
                throw new Error(err || "Login failed");
        }

        const data = await res.json()

        if (!data.user.isActive) {
                throw new Error("Your account has been banned. Contact support.");
        }

        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))

        return data.user
}

loginForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        const formData = new FormData(this)

        try {
                await login(formData.get('email'), formData.get('password'))
                alert('Logged In!')
        } catch (err) {
                alert(err.message)
        }
})

