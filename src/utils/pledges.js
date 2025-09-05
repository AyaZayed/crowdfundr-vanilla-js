const DB_SERVER = import.meta.env.VITE_DB_SERVER;

export async function getAllPledges() {
        const res = await fetch(`${DB_SERVER}/pledges`)
        return res.json()
}