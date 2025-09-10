import { getToken } from "./src/utils/auth";
import { getAllCampaigns, getCompletedCampaigns, getFeaturedCampaigns } from "./src/utils/campaigns";
import { getTotalBackers, getTotalPledge } from "./src/utils/pledges";

const token = getToken();
localStorage.setItem('redirect-url', window.location.href);

if (token) {
        loggedOut.style.display = "none";
        profile.style.display = "flex";
} else {
        loggedOut.style.display = "flex";
        profile.style.display = "none";
}

const isAdmin = localStorage.getItem("isAdmin")

if (isAdmin === "true") {
        adminBtns.style.display = "flex";
        userBtns.style.display = "none";
} else {
        adminBtns.style.display = "none";
        userBtns.style.display = "flex";
}

const navList = document.querySelector('.nav .nav--list')

menuBtn.addEventListener('click', () => {
        navList.classList.toggle('open')
})

const allPledges = await getTotalPledge();
const allBackers = await getTotalBackers();
const allCampaigns = await getAllCampaigns();
const allCompleted = await getCompletedCampaigns()

totalPledged.textContent = `$${allPledges || 0}`
totalBackers.textContent = allBackers || 0
totalCampaigns.textContent = allCampaigns && allCampaigns.length || 0
totalCompleted.textContent = allCompleted && allCompleted.length || 0

const featuredCampaigns = await getFeaturedCampaigns()

const featuredCards = document.querySelector('#featuredCampaigns')

const card = (campaign) => `
        <a href="/src/admin/campaigns/details" class="card">
                     <img
                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="" />
                     <div class="card__content">
                        <h3>${campaign.title}</h3>
                        <div class="progress">
                                <div class="progress-bar">
                                        <div class="bar" style="width: ${Math.floor((campaign.raised / campaign.goal) * 100)}%"></div>
                                        </div>
                                <div class="progress-nums">
                                        <span>$${campaign.raised}</span>
                                        <span>${Math.floor((campaign.raised / campaign.goal) * 100)}%</span>
                                </div>
                        </div>
                   </div>
                  </a>
`

featuredCampaigns.forEach(campaign => {
        console.log(campaign)
        featuredCards.innerHTML += card(campaign)
})

