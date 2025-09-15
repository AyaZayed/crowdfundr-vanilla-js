const DB_SERVER = import.meta.env.VITE_DB_SERVER;

export async function getAllPledges() {
        const res = await fetch(`${DB_SERVER}/pledges`)
        return res.json()
}

export async function makePledge(data) {
        await fetch(`${DB_SERVER}/pledges`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
        })

        const campaign = await fetch(`${DB_SERVER}/campaigns/${data.campaignId}`)

        const raised = await campaign.json().then(c => c.raised)

        await fetch(`${DB_SERVER}/campaigns/${data.campaignId}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ raised: raised + data.amount })
        })

        return
}

export async function getUserPledges(id) {
        const res = await fetch(`${DB_SERVER}/pledges/?userId=${id}`)
        return res.json()
}

export async function getAveragePledge() {
        const res = await fetch(`${DB_SERVER}/pledges`)
        const pledges = await res.json()
        const total = pledges.reduce((acc, pledge) => acc + pledge.amount, 0)
        console.log(total, pledges.length);

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

export async function getAvgBackersPerCamp() {
        const res = await fetch(`${DB_SERVER}/pledges`)
        const pledges = await res.json()
        const res2 = await fetch(`${DB_SERVER}/campaigns`)
        const campaigns = await res2.json()

        let totalBackers = 0;

        campaigns.forEach(campaign => {
                const backers = new Set(
                        pledges
                                .filter(p => p.campaignId === campaign.id)
                                .map(p => p.userId)
                );
                totalBackers += backers.size;
        });

        const averageBackers = totalBackers / campaigns.length;

        return averageBackers.toFixed(2);

}

export async function getTotalCamapignBackers(id) {
        const res = await fetch(`${DB_SERVER}/pledges/?campaignId=${id}`)
        const pledges = await res.json()

        const backers = new Set(pledges.map(pledge => pledge.userId))
        return backers.size
}

export const getAllPledgesWithDetails = async () => {
        const res = await fetch(
                `${DB_SERVER}/pledges?_expand=user&_expand=campaign&_expand=reward`
        );
        return await res.json();
};
