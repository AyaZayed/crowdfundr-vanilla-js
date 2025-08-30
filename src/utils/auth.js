export function getUser() {
        const user = JSON.parse(localStorage.getItem('user'))
        return user
}

export function getToken() {
        const token = localStorage.getItem('token')
        return token
}

export function authenticate() {
        const user = getUser();
        if (!user) {
                window.location.href = "/src/login/";
        }
}

const logoutBtn = document.querySelector('#logoutBtn')

if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
                localStorage.removeItem('user')
                localStorage.removeItem('token')
        })
}