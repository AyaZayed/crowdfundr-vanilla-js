import Card from "../scripts/campaignCard"
import { getApprovedCampaigns, getCategories } from "../utils/campaigns"
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

const categoryOptions = (categories) => {
        let options = [`<option value="all">Categories</option>`]
        categories.forEach(category => {
                options += `<option value="${category}">${category}</option>`
        })
        return options
}

const categories = await getCategories()

categorySelect.innerHTML = categoryOptions(categories)

categorySelect.addEventListener('change', function () {
        if (this.value === 'all') {
                const filteredCampaigns = approvedCampaigns.slice(0, shownCount)
                renderCampaigns(filteredCampaigns)
        }
        const filteredCampaigns = approvedCampaigns.filter(campaign => campaign.category.toLowerCase() === this.value.toLowerCase()).slice(0, shownCount)

        renderCampaigns(filteredCampaigns)
})

filterSelect.addEventListener('change', function () {
        if (this.value === 'sort') {
                const filteredCampaigns = approvedCampaigns.slice(0, shownCount)
                renderCampaigns(filteredCampaigns)
        }
        if (this.value === 'newest') {
                const filteredCampaigns = approvedCampaigns.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, shownCount)
                renderCampaigns(filteredCampaigns)
        }
        if (this.value === 'oldest') {
                const filteredCampaigns = approvedCampaigns.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).slice(0, shownCount)
                renderCampaigns(filteredCampaigns)
        }
        if (this.value === 'highest') {
                const filteredCampaigns = approvedCampaigns.sort((a, b) => b.raised - a.raised).slice(0, shownCount)
                renderCampaigns(filteredCampaigns)
        }
        if (this.value === 'lowest') {
                const filteredCampaigns = approvedCampaigns.sort((a, b) => a.raised - b.raised).slice(0, shownCount)
                renderCampaigns(filteredCampaigns)
        }
})

const cards = document.querySelectorAll('.card')

cards.forEach((card) => {
        card.addEventListener('click', function (e) {
                e.preventDefault()
                localStorage.setItem('campaignId', card.id)
                window.location.href = "/src/campaigns/details/"
        })
})