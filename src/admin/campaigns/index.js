import { allCamapaigns } from ".."

const emptyCampaigns = document.querySelector('#emptyCampaigns')
const campaignsInfo = document.querySelector('#campaignsInfo')
const campaignsList = document.querySelector('#campaignsList')
const totalCampaigns = document.querySelector('#totalCampaigns')
const totalCompleted = document.querySelector('#totalCompleted')
const totalRaised = document.querySelector('#totalRaised')
const totalBackers = document.querySelector('#totalBackers')

totalCampaigns.textContent = allCamapaigns.length

if (allCamapaigns.length === 0) {
        emptyCampaigns.style.display = "flex";
        campaignsInfo.style.display = "none";
} else {
        emptyCampaigns.style.display = "none";
        campaignsInfo.style.display = "block";
}