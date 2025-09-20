import Card from "../scripts/campaignCard"
import { initCategorySelect } from "../scripts/categoryDropdown"
import Dropdown from "../scripts/dropdown"
import { getApprovedCampaigns } from "../utils/campaigns"
const campaignsCards = document.querySelector('#campaignsList')

const approvedCampaigns = await getApprovedCampaigns()

let shownCount = 5
const shownCampaigns = approvedCampaigns.slice(0, shownCount)

const renderCampaigns = (campaigns) => {
        if (campaigns.length === 0) {
                return
        }
        campaignsCards.innerHTML = ''

        campaigns.forEach(campaign => {
                campaignsCards.innerHTML += Card(campaign)
        })
}

renderCampaigns(shownCampaigns)

const loadMoreBtn = document.querySelector('#loadMoreBtn')

if (approvedCampaigns.length < shownCount) {
        loadMoreBtn.style.display = 'none'
}

loadMoreBtn.addEventListener('click', function () {
        shownCount += 5
        if (approvedCampaigns.length < shownCount) {
                loadMoreBtn.style.display = 'none'
        }
        const moreCampaigns = approvedCampaigns.slice(0, shownCount)
        renderCampaigns(moreCampaigns)
})


searchInput.addEventListener('input', function () {
        const filteredCampaigns = approvedCampaigns.filter(campaign => campaign.title.toLowerCase().includes(this.value.toLowerCase())).slice(0, shownCount)
        renderCampaigns(filteredCampaigns)
})

const categoryContainer = document.querySelector("#categoryContainer");

initCategorySelect(categoryContainer, {
        selectedCategory: "all",
        onChange: (value) => {
                if (value === "all") {
                        renderCampaigns(approvedCampaigns.slice(0, shownCount));
                        return;
                }
                const filtered = approvedCampaigns
                        .filter(c => c.category.toLowerCase() === value.toLowerCase())
                        .slice(0, shownCount);
                renderCampaigns(filtered);
        }
});


const filterSelect = document.querySelector("#filterSelect");

Dropdown(filterSelect, (value) => {
        if (value === "sort") {
                const filteredCampaigns = approvedCampaigns.slice(0, shownCount);
                renderCampaigns(filteredCampaigns);
        }
        if (value === "newest") {
                const filteredCampaigns = approvedCampaigns
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .slice(0, shownCount);
                renderCampaigns(filteredCampaigns);
        }
        if (value === "oldest") {
                const filteredCampaigns = approvedCampaigns
                        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                        .slice(0, shownCount);
                renderCampaigns(filteredCampaigns);
        }
        if (value === "highest") {
                const filteredCampaigns = approvedCampaigns
                        .sort((a, b) => b.raised - a.raised)
                        .slice(0, shownCount);
                renderCampaigns(filteredCampaigns);
        }
        if (value === "lowest") {
                const filteredCampaigns = approvedCampaigns
                        .sort((a, b) => a.raised - b.raised)
                        .slice(0, shownCount);
                renderCampaigns(filteredCampaigns);
        }
});


const cards = document.querySelectorAll('.card')

cards.forEach((card) => {
        card.addEventListener('click', function (e) {
                e.preventDefault()
                localStorage.setItem('campaignId', card.id)
                window.location.href = "/src/campaigns/details/"
        })
})