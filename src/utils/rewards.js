const DB_SERVER = import.meta.env.VITE_DB_SERVER;

export const getAllRewards = async () => {
        const res = await fetch(`${DB_SERVER}/campaigns`)
        const rewards = await res.json().then(campaigns => campaigns.map(campaign => campaign.rewards))
        return rewards
}

export const getRewardById = async (id) => {
        const res = await fetch(`${DB_SERVER}/campaigns`)
        const rewards = await res.json().then(campaigns => campaigns.map(campaign => campaign.rewards))
        return rewards[0].find(reward => reward.id === id)
}