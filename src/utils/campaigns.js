export async function getAllCampaigns() {
        const res = await fetch('http://localhost:5000/campaigns')
        return res.json()
}

export async function getCampaignById(id) {
        const res = await fetch(`http://localhost:5000/campaigns/${id}`)
        return res.json()
}

export async function getApprovedCampaigns() {
        const res = await fetch('http://localhost:5000/campaigns?isApproved=true')
        return res.json()
}

export async function createCampaign(campaign) {
        const res = await fetch('http://localhost:5000/campaigns', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(campaign)
        })
        return res.json()
}