import { approveCampaign, deleteCampaign, featureCamapaign, getActiveCampaigns, getAllCampaigns, getCompletedCampaigns } from "../../utils/campaigns"
import { getTotalBackers } from "../../utils/pledges"
import EmptyCase from "../scripts/emptyCase"
import Modal from "../scripts/modal"
import Pagination from "../scripts/paginationAndSearch"

const emptyCampaigns = document.querySelector('#emptyCampaigns')
const campaignsInfo = document.querySelector('#campaignsInfo')
const campaignsList = document.querySelector('#campaignsList')
const totalActive = document.querySelector('#totalCampaigns')
const totalCompleted = document.querySelector('#totalCompleted')
const totalRaised = document.querySelector('#totalRaised')
const totalBackers = document.querySelector('#totalBackers')

const allCamapaigns = await getAllCampaigns()
const activeCampaigns = await getActiveCampaigns()
const backers = await getTotalBackers()
const completedCampaigns = await getCompletedCampaigns()
const raised = allCamapaigns && allCamapaigns.reduce((acc, curr) => acc + curr.raised, 0)

totalActive.textContent = activeCampaigns && activeCampaigns.length || 0
totalCompleted.textContent = completedCampaigns && completedCampaigns.length || 0
totalRaised.textContent = raised || 0;
totalBackers.textContent = backers || 0

EmptyCase(allCamapaigns, emptyCampaigns, campaignsInfo)

const statusCell = (status) => `
  <td class="status">
    <span class="bullet" data-bullet="${status === "active" ? "success" : status === "completed" ? "primary" : status === "cancelled" ? "danger" : "violet"}">
      ${status === "active" ? "Active" : status === "completed" ? "Completed" : status === "cancelled" ? "Cancelled" : "Pending"}
    </span>
  </td>
`;

const approvalCell = (isApproved) => `
  <td class="isApproved">
    <span class="bullet" data-bullet="${isApproved ? "success" : "violet"}">
      ${isApproved ? "Approved" : "Pending"}
    </span>
  </td>
`;


const progressCell = (raised, goal) => `
  <td class="progress">
    <div class="progress-nums"><span>$${raised}</span><span>${Math.floor((raised / goal) * 100)}%</span></div>
    <div class="progress-bar">
      <div class="bar" style="width: ${Math.floor((raised / goal) * 100)}%"></div>
    </div>
  </td>
`;

const featuredCell = (isFeatured) => `
  <td class="featured">
   <label class="switch">
    <input type="checkbox" id="featureSwitch" ${isFeatured ? "checked" : ""}>
    <span class="slider"></span>
  </label>
  </td>
`;

campaignsList.addEventListener('click', async function (e) {
  const id = e.target.closest("tr").dataset.id;
  if (!id) return;

  if (e.target.id === "featureSwitch") {
    await featureCamapaign(id, e.target.checked);
  }
})

// < a href = "/src/campaigns/details" class="btn btn-secondary-outline" >
//   <i class="fa-solid fa-eye"></i> View
//   </ >


const actionsCell = (isApproved) => `
  <td class="actions">
   ${isApproved ? `
    <a href="/src/campaigns/details" class="btn btn-secondary-outline">
      <i class="fa-solid fa-eye"></i> View
    </a>
    ` : `<button class="approveBtn btn btn-success-outline"><i class="fa-solid fa-check"></i> Approve</button></button>`
  }
    <button class="deleteBtn btn btn-danger-outline">
      <i class="fa-solid fa-trash-can"></i> Delete
    </button>
  </td>
`;

export const renderCampaigns = (campaigns) => {
  campaignsList.innerHTML = campaigns.map(campaign => `
                <tr data-id="${campaign.id}">
                        <td>${campaign.title}</td>
                        <td>$${campaign.goal}</td>
                        ${progressCell(campaign.raised, campaign.goal)}
                        <td>${campaign.created_at}</td>
                        <td>${campaign.deadline}</td>
                        ${approvalCell(campaign.isApproved)}
                        ${featuredCell(campaign.isFeatured)}
                        ${statusCell(campaign.status)}
                        ${actionsCell(campaign.isApproved)}
                </tr>
  `).join("");
};

const filters = ["title"]

Pagination(allCamapaigns, renderCampaigns, filters)

Modal(campaignsList, "deleteBtn", deleteCampaign, "Are you sure you want to delete this campaign?");
Modal(campaignsList, "approveBtn", approveCampaign, "Are you sure you want to approve this campaign?");
