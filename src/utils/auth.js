const DB_SERVER = import.meta.env.VITE_DB_SERVER;

export async function registerUser(name, email, password) {
        const res = await fetch(`${DB_SERVER}/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, isActive: 'true', role: 'user' })
        })

        if (!res.ok) {
                throw new Error('Problem with registration, try again!')
        }

        const data = await res.json()
        localStorage.setItem('token', data.accessToken)

        return
}

export async function login(email, password) {
        const res = await fetch(`${DB_SERVER}/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
        })

        if (!res.ok) {
                const err = await res.json();
                throw new Error(err || "Problem logging in, try again!");
        }

        const data = await res.json()

        if (!data.user.isActive) {
                throw new Error("Your account has been banned. Contact support.");
        }

        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('isAdmin', data.user.role === 'admin' ? 'true' : 'false')

        return
}

export function getToken() {
        const token = localStorage.getItem('token')
        return token
}

function parseJwt(token) {
        try {
                const base64Url = token.split(".")[1];
                const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                return JSON.parse(atob(base64));
        } catch (e) {
                return null;
        }
}

export async function getCurrentUser() {
        const token = getToken();
        if (!token) return null;

        const result = parseJwt(token);
        if (!result) return null;

        const res = await fetch(`http://localhost:5000/users?id=${result.sub}`, {
                headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch user data");

        return await res.json();
}

export function authenticate() {
        localStorage.setItem('redirect-url', window.location.href)

        const token = getToken();
        if (!token) {
                window.location.href = '/src/register/';
        }
}

export async function isAdmin() {
        const admin = localStorage.getItem('isAdmin')
        localStorage.setItem('redirect-url', window.location.href)

        if (!admin) {
                window.location.href = '/src/login/';
        }
}

const logoutBtn = document.querySelector('#logoutBtn')

if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
                localStorage.removeItem('token')
                localStorage.removeItem('isAdmin')
        })
}



