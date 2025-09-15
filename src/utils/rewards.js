import { getToken } from "./auth";

const DB_SERVER = import.meta.env.VITE_DB_SERVER;

export const getAllRewards = async () => {
        const res = await fetch(`${DB_SERVER}/rewards`)
        const data = await res.json();
        return data;
}

export async function createReward(reward, campaignId) {
        const token = getToken()
        const res = await fetch(`${DB_SERVER}/rewards`, {
                method: 'POST',
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ ...reward, campaignId })
        })
        return res.json()
}

export async function editReward(reward, id) {
        const token = getToken()

        const res = await fetch(`${DB_SERVER}/rewards/${id}`, {
                method: 'PATCH',
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(reward)
        })
        const data = await res.json()
        return data
}

export async function getCampaignRewards(id) {
        const res = await fetch(`${DB_SERVER}/rewards/?campaignId=${id}`)
        return res.json()
}