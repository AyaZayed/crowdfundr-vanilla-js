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

export async function getActiveCampaigns() {
        const res = await fetch(`${DB_SERVER}/campaigns?status=active`)
        return res.json()
}

export async function getCompletedCampaigns() {
        const res = await fetch(`${DB_SERVER}/campaigns?status=completed`)
        return res.json()
}

export async function getFeaturedCampaigns() {
        const res = await fetch(`${DB_SERVER}/campaigns?isFeatured=true`)
        return res.json().then(campaigns => campaigns.slice(0, 3))
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

export async function deleteCampaign(id) {
        const token = getToken()
        const res = await fetch(`${DB_SERVER}/campaigns/${id}`, {
                method: 'DELETE',
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                }
        })
        return res.json()
}

export async function featureCamapaign(id, isFeatured) {
        const token = getToken()
        const res = await fetch(`${DB_SERVER}/campaigns/${id}`, {
                method: 'PATCH',
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ isFeatured: true })
        })
        return res.json()

}

export async function approveCampaign(id) {
        const token = getToken()
        const res = await fetch(`${DB_SERVER}/campaigns/${id}`, {
                method: 'PATCH',
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ isApproved: true, status: 'active' })
        })
        return res.json()
}