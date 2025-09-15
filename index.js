import Card from "./src/scripts/campaignCard";
import { getAllCampaigns, getCompletedCampaigns, getFeaturedCampaigns } from "./src/utils/campaigns";
import { getTotalBackers, getTotalPledge } from "./src/utils/pledges";


const allPledges = await getTotalPledge();
const allBackers = await getTotalBackers();
const allCampaigns = await getAllCampaigns();
const allCompleted = await getCompletedCampaigns()

totalPledged.textContent = `$${allPledges || 0}`
totalBackers.textContent = allBackers && allBackers || 0
totalCampaigns.textContent = allCampaigns && allCampaigns.length || 0
totalCompleted.textContent = allCompleted && allCompleted.length || 0

const featuredCampaigns = await getFeaturedCampaigns()

const featuredCards = document.querySelector('#featuredCampaigns')

featuredCampaigns.forEach(campaign => {
        featuredCards.innerHTML += Card(campaign)
})

const cards = document.querySelectorAll('.card')

cards.forEach((card) => {
        card.addEventListener('click', function (e) {
                e.preventDefault()
                localStorage.setItem('campaignId', card.id)
                window.location.href = "/src/campaigns/details/"
        })
})

const callToAction = document.querySelector('#callToAction')

if (localStorage.getItem('isAdmin') === 'true') {
        callToAction.style.display = 'none'
}