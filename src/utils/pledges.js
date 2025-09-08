const DB_SERVER = import.meta.env.VITE_DB_SERVER;

export async function getAllPledges() {
        const res = await fetch(`${DB_SERVER}/pledges`)
        return res.json()
}

export async function getAveragePledge() {
        const res = await fetch(`${DB_SERVER}/pledges`)
        const pledges = await res.json()
        const total = pledges.reduce((acc, pledge) => acc + pledge.amount, 0)
        return (total / pledges.length).toFixed(2)
}

export async function getTotalPledge() {
        const res = await fetch(`${DB_SERVER}/pledges`)
        const pledges = await res.json()
        return pledges.reduce((acc, pledge) => acc + pledge.amount, 0)
}

export async function getTotalBackers() {
        const res = await fetch(`${DB_SERVER}/pledges`)
        const pledges = await res.json()
        const backers = new Set(pledges.map(pledge => pledge.userId))
        return backers.size
}