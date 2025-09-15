import Alert from "../scripts/alert";
import { authenticate, getCurrentUser } from "../utils/auth";
import { getCampaignById, getUserCampaigns } from "../utils/campaigns";
import { getTotalCamapignBackers, getUserPledges } from "../utils/pledges";
import { getUserById, updateUserInfo } from "../utils/users"
import { isValidEmail, isValidMatchPass, isValidName, isValidPassword } from "../utils/validation";

authenticate();
const user = await getCurrentUser();

const userCampaigns = await getUserCampaigns(user[0].id);
const userPledges = await getUserPledges(user[0].id);

const hasCampaigns = userCampaigns.length > 0;
const hasPledges = userPledges.length > 0;

if (hasPledges && !hasCampaigns) {
        introBtn.textContent = "Discover Campaigns";
        introBtn.href = "/src/campaigns/";
        campaignsTabs.style.display = "none";
        campaignsStats.style.display = "none";
        activePledgesTab.classList.add("active");
} else if (hasCampaigns && !hasPledges) {
        introBtn.textContent = "Launch Campaign";
        introBtn.href = "/src/campaigns/create/";
        pledgesTabs.style.display = "none";
        pledgesStats.style.display = "none";
        activeCampaignsTab.classList.add("active");
} else if (!hasPledges && !hasCampaigns) {
        introBtn.textContent = "Launch Campaign";
        introBtn.href = "/src/campaigns/create/";
        pledgesTabs.style.display = "none";
        statsCards.style.display = "none";
        campaignsTabs.style.display = "none";
        settingsTab.classList.add("active");
} else {
        introBtn.textContent = "View Campaigns";
        introBtn.href = "/src/campaigns/";
        activeCampaignsTab.classList.add("active");
}

userName.textContent = user[0].name;
totalCampaigns.textContent = userCampaigns.length || 0;
totalPledges.textContent = userPledges.length || 0;
totalRaised.textContent = `$${userCampaigns.reduce((acc, curr) => acc + curr.raised, 0)}`;
totalAmount.textContent = `$${userPledges.reduce((acc, curr) => acc + curr.amount, 0)}`;

const tabMap = {
        activeCampaigns: "activeCampaignsTab",
        completedCampaigns: "completedCampaignsTab",
        activePledges: "activePledgesTab",
        completedPledges: "completedPledgesTab",
        settings: "settingsTab",
        pledges: "activePledgesTab",
        campaigns: "activeCampaignsTab"
};

function activateTab(tabId) {
        tabs.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));

        document.querySelectorAll(".tabs__content").forEach((c) => {
                c.style.display = "none";
        });

        const newTab = document.getElementById(tabId);
        if (newTab) {
                newTab.classList.add("active");

                const contentId = tabId.replace("Tab", "");
                const content = document.getElementById(contentId);
                if (content) content.style.display = "block";
        }
}

function handleHash() {
        let hash = window.location.hash.replace("#", "").replace("/", "");
        const tabId = tabMap[hash];
        if (tabId) {
                activateTab(tabId);
        }
}

tabs.addEventListener("click", (e) => {
        if (e.target.classList.contains("tab")) {
                const tabId = e.target.id;
                activateTab(tabId);

                const hash = tabId.replace("Tab", "");
                history.pushState(null, null, `#${hash}`);
        }
});

window.addEventListener("DOMContentLoaded", handleHash);
window.addEventListener("hashchange", handleHash);

handleHash();

const campCard = async (campaign, isCompleted) => {
        const campaignBackers = await getTotalCamapignBackers(campaign.id);
        const timeLeft = new Date(campaign.deadline) - new Date()

        return `
        <div class="campaign card" id="${campaign.id}">
                <div class="campaign__img">
                        <img src="${campaign.img}" alt="${campaign.title}" />
                </div>
                <div class="campaign__info">
                        <div class="row">
                                <div class="row">
                                <h3 class="campaign__title">${campaign.title}</h3>
                                                <span class="bullet" data-bullet="completed">${campaign.isApproved ? "Approved" : "Pending"}</span>
                                </div>

                                ${isCompleted ? '<span class="bullet" data-bullet="completed">Completed</span>' : `
                                        <div class="actions">
                                        <a href="/src/campaigns/details/"  data-action="view" class="btn btn-primary-outline"><i class="fa-solid fa-eye"></i> View</a>
                                        <a href="/src/campaigns/edit/" data-action="edit" class="btn btn-outline"><i class="fa-solid fa-pen"></i> Edit</a>
                                </div>
                                        `}
                        </div>
                        <p class="campaign__description">${campaign.description}</p>
                        <div class="campaign__stats">
                                <div class="stat">
                                        <p class="stat--title">Raised</p>
                                        
                                         <div class="progress">
                                          <div class="progress-nums">
                                        <span>$${campaign.raised} of $${campaign.goal}</span>
                                </div>
                                <div class="progress-bar">
                                        <div class="bar" style="width: ${Math.floor((campaign.raised / campaign.goal) * 100)}%"></div>
                                        </div>
                               
                        </div>
                                </div>
                                <div class="stat">
                                        <p class="stat--title">Backers</p>
                                        <p class="stat--value">${campaignBackers}</p>
                                </div>
                                <div class="stat">
                                        ${isCompleted ? `
                                                <p class="stat--title"><i class="fa-regular fa-calendar"></i></p>
                                        <p class="stat--value">Ended</p>
                                                ` : `
                                                <p class="stat--title">Days Left</p>
                                        <p class="stat--value">${new Date(timeLeft).getDate()}</p>
                                                `}
                                </div>
                                
                        </div>
                </div>
        </div>
`
}

const completedCamps = userCampaigns.filter((c) => c.raised === c.goal);

(async () => {
        const cards = await Promise.all(userCampaigns.map((c) => campCard(c, false)));
        activeCampaigns.innerHTML = cards.join("");
})();

(async () => {
        const cards = await Promise.all(completedCamps.map((c) => campCard(c, true)));
        completedCampaigns.innerHTML = cards.join("");
})();

const pledgeCard = async (pledge, isCompleted) => {
        const campaignCreator = await getUserById(pledge.userId);
        const campaign = await getCampaignById(pledge.campaignId);
        const timeLeft = new Date(campaign.deadline) - new Date()

        return `
        <div class="pledge card" id="${campaign.id}">
                <div class="pledge__img">
                        <img src="${campaign.img}" alt="${campaign.title}" />
                </div>
                <div class="pledge__info">
                        <div class="row">
                                <div class="col">
                                        <h3 class="campaign__title">${campaign.title}</h3>
                                        <p class="campaign__creator">By ${campaignCreator.name}</p>
                                </div>
                               <div class="actions">
                                         ${isCompleted ?
                        '<span class="bullet" data-bullet="completed">Completed</span>' : `
                                        <span class="bullet" data-bullet="outline">Active</span>
                                        `}
                                                 <a href="/src/campaigns/details/" data-action="view" class="btn"><i class="fa-solid fa-eye"></i> View</a>
                               </div>
                        </div>
                        <div class="pledge__stats">
                                 <div class="stat">
                                        <p class="stat--title">Your pledge</p>
                                        <p class="stat--value">${pledge.amount}</p>
                                </div>
                                
                                <div class="stat">
                                        <p class="stat--title">Progress</p>
                                        <p class="stat--value">${Math.floor((campaign.raised / campaign.goal) * 100)}% funded</p>
                                </div>
                                <div class="stat">
                                        ${isCompleted ? `
                                                <p class="stat--title"><i class="fa-regular fa-calendar"></i></p>
                                        <p class="stat--value">Ended</p>
                                                ` : `
                                                <p class="stat--title">Days Left</p>
                                        <p class="stat--value">${new Date(timeLeft).getDate()}</p>
                                                `}

                                </div>
                        </div>
                </div>
        </div>
`
}


(async () => {
        userPledges.forEach(async (p) => {
                const campaign = await getCampaignById(p.campaignId);
                if (campaign.status === "active") {
                        const cards = await Promise.all([pledgeCard(p, false)]);
                        activePledges.innerHTML = cards.join("");
                }
        })
})();

(async () => {
        userPledges.forEach(async (p) => {
                const campaign = await getCampaignById(p.campaignId);
                if (campaign.status === "completed") {
                        const cards = await Promise.all([pledgeCard(p, true)]);
                        completedPledges.innerHTML = cards.join("");
                }
        })
})();

const dataSection = document.querySelector('.data')


dataSection.addEventListener('click', function (e) {
        if (e.target.dataset.action) {
                e.preventDefault()

                localStorage.setItem('campaignId', e.target.closest('.card').id)
                if (e.target.dataset.action === 'view') {
                        window.location.href = "/src/campaigns/details/"
                }
                if (e.target.dataset.action === 'edit') {
                        window.location.href = "/src/campaigns/edit/"
                }
        }
})

const nameInput = document.querySelector('#settingsForm #name')
const emailInput = document.querySelector('#settingsForm #email')

nameInput.value = user[0].name
emailInput.value = user[0].email
password.value = user[0].password
matchPassword.value = user[0].password

settingsForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        if (!isValidSubmission()) {
                return
        }

        const formData = new FormData(this)

        const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
        }

        try {
                await updateUserInfo(user[0].id, data)
                await Alert('Information Updated')
                window.location.reload()
        } catch (err) {
                await Alert(err.message)
        }
})

nameInput.addEventListener('input', async function (e) {
        e.preventDefault()
        const nameVal = this.value
        const msgs = isValidName(nameVal)
        nameErrors.textContent = msgs
})

email.addEventListener('input', async function (e) {
        e.preventDefault()
        const emailVal = this.value
        const msgs = isValidEmail(emailVal)
        emailErrors.textContent = msgs
})

password.addEventListener('input', async function (e) {
        e.preventDefault()
        const passVal = this.value
        const msgs = isValidPassword(passVal)
        passErrors.textContent = msgs
})

matchPassword.addEventListener('input', async function (e) {
        e.preventDefault()
        const matchVal = this.value
        const passVal = password.value
        const msgs = isValidMatchPass(passVal, matchVal)
        matchPassErrors.textContent = msgs
})

function isValidSubmission() {
        return nameErrors.textContent === '' &&
                emailErrors.textContent === '' &&
                passErrors.textContent === '' &&
                matchPassErrors.textContent === ''
}