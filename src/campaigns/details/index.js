import { getCurrentUser } from "../../utils/auth"
import { getCampaignById } from "../../utils/campaigns"
import { getTotalCamapignBackers } from "../../utils/pledges"
import { getUserById } from "../../utils/users"

const detailsSection = document.querySelector('#campDetails')

const campaignId = localStorage.getItem('campaignId')

const campaign = await getCampaignById(campaignId)

const creator = await getUserById(campaign.creatorId)

const totalBackers = await getTotalCamapignBackers(campaign.id)

const timeLeft = new Date(campaign.deadline) - new Date()

const isAdmin = localStorage.getItem('isAdmin')

const user = await getCurrentUser()

const details = (campaign, creator, totalBackers, timeLeft) => `
  <img src="${campaign.img}" alt="${campaign.title}" class="campaign__img" />
  <div class="campaign__content">
    
    <div class="campaign--info">
      <div class="user-info">
        <div class="img">
          <span>${creator.name.split(" ")[0][0]}</span>
          <span>${creator.name.split(" ")[1][0] || ""}</span>
        </div>
        <span>${creator.name}</span>
      </div>
      <div class="bullet" data-bullet="outline">${campaign.category}</div>
    </div>

    <h1 class="campaign--title">${campaign.title}</h1>
    <p>${campaign.description}</p>

    <div class="card campaign__nums">
      <div class="progress">
        <p class="pledged"><span id="raised">$${campaign.raised}</span> pledged of $${campaign.goal} goal</p>
        <div class="progress-bar">
          <div class="bar" style="width: ${Math.floor((campaign.raised / campaign.goal) * 100)}%"></div>
        </div>
      </div>
      <p class="funded">${Math.floor((campaign.raised / campaign.goal) * 100)}% funded</p>

      <div class="campaign__stats">
        <div class="campaign__stats--item">
          <span class="num">${totalBackers}</span>
          <span>backers</span>
        </div>
        <div class="campaign__stats--item">
          <span class="num">${new Date(timeLeft).getDate()}</span>
          <span>days left</span>
        </div>
      </div>

      ${user && user[0].id === campaign.creatorId ? `<a href="/src/campaigns/edit/" class="btn btn-primary">Edit <i class="fa-solid fa-pen"></i></a>` : `${isAdmin === 'true'
    ? ``
    : `<a href="/src/pledge/" class="btn btn-primary">Pledge</a>`
    }`}
    </div >
  </div >
  `;

detailsSection.innerHTML += details(campaign, creator, totalBackers, timeLeft)