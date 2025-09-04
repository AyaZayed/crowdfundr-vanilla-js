import { getToken } from "./auth";

const DB_SERVER = import.meta.env.VITE_DB_SERVER;

export async function getAllCampaigns() {
        const res = await fetch(`${DB_SERVER}/campaigns`)
        return res.json()
}

export async function getCampaignById(id) {
        const res = await fetch(`${DB_SERVER}/campaigns/${id}`)
        return res.json()
}

export async function getApprovedCampaigns() {
        const res = await fetch(`${DB_SERVER}/campaigns?isApproved=true`)
        return res.json()
}

export async function createCampaign(campaign) {
        const token = getToken()
        const res = await fetch(`${DB_SERVER}/campaigns`, {
                method: 'POST',
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(campaign)
        })
        return res.json()
}
