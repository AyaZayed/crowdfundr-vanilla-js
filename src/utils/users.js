const DB_SERVER = import.meta.env.VITE_DB_SERVER;

export async function getAllUsersExcept(id) {
        const res = await fetch(`${DB_SERVER}/users`)
        const filtered = await res.json().then(users => users.filter(user => user.id !== id))
        return filtered
}

export async function getUserById(id) {
        const res = await fetch(`${DB_SERVER}/users/${id}`)
        return res.json()
}

export async function changeRole(id, role) {
        const res = await fetch(`${DB_SERVER}/users/${id}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role })
        })

        return res.json()
}

export async function changeUserStatus(id, isActive) {
        const res = await fetch(`${DB_SERVER}/users/${id}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive })
        })

        return res.json()
}