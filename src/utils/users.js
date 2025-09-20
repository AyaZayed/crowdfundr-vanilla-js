const DB_SERVER = import.meta.env.VITE_DB_SERVER;
import { getCurrentUser, getToken } from "./auth"

export async function getAllUsersExcept() {
        const res = await fetch(`${DB_SERVER}/users`)
        const user = await getCurrentUser()
        const id = user[0].id
        const filtered = await res.json().then(users => users.filter(user => user.id !== id && user.role !== "superAdmin"))
        return filtered
}

export async function getUserById(id) {
        const res = await fetch(`${DB_SERVER}/users/${id}`)
        return res.json()
}

export async function updateUserInfo(id, data) {
        const token = getToken()
        const res = await fetch(`${DB_SERVER}/users/${id}`, {
                method: 'PATCH',
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
        })
        return res.json()
}

export async function changeRole(id, role) {
        const res = await fetch(`${DB_SERVER}/users/${id}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role, isActive: true })
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