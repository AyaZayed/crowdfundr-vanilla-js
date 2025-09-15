import { getAllCampaigns } from "../utils/campaigns";
import { getTotalBackers } from "../utils/pledges";

const allBackers = await getTotalBackers();
const allCampaigns = await getAllCampaigns();

totalCampaigns.textContent = allCampaigns && allCampaigns.length || 0
totalRaised.textContent = `$${allCampaigns && allCampaigns.reduce((acc, curr) => acc + curr.raised, 0).toLocaleString() || 0}`
totalSupporters.textContent = allBackers && allBackers || 0