export async function getAllCampaigns() {
        const res = await fetch('http://localhost:5000/campaigns')
        return res.json()
}

