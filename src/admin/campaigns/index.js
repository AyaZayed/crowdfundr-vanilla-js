import { approveCampaign, deleteCampaign, featureCamapaign, getActiveCampaigns, getAllCampaigns, getCompletedCampaigns } from "../../utils/campaigns"
import { getTotalBackers } from "../../utils/pledges"
import EmptyCase from "../scripts/emptyCase"
import Confirm from "../scripts/confirm"
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
totalRaised.textContent = `$${raised.toLocaleString() || 0}`;
totalBackers.textContent = backers || 0

EmptyCase(allCamapaigns, emptyCampaigns, campaignsInfo)

const statusCell = (status) => `
  <td class="status">
    <span class="bullet" data-bullet="${status === "active" ? "success" : status === "completed" ? "primary" : status === "cancelled" ? "danger" : "violet"}">
      ${status === "active" ? "Active" : status === "completed" ? "Completed" : status === "cancelled" ? "Cancelled" : "Pending"}
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
    <a href="/src/campaigns/details/" target="_blank" data-action="view" class="btn btn-secondary-outline">
      <i class="fa-solid fa-eye"></i> View
    </a>
    ` : `<button data-action="approve" class=" btn btn-success-outline"><i class="fa-solid fa-check"></i> Approve</button></button>`
  }
    <button data-action="delete" class=" btn btn-danger-outline">
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
                        <td class="date">${campaign.deadline}</td>
                        ${featuredCell(campaign.isFeatured)}
                        ${statusCell(campaign.status)}
                        ${actionsCell(campaign.isApproved)}
                </tr>
  `).join("");
};

const filters = ["title"]

const statusSelect = document.querySelector("#statusSelect")
const featuredSelect = document.querySelector("#featuredSelect")

Pagination(allCamapaigns, renderCampaigns, filters, statusSelect, campaign => campaign.status === statusSelect.value)
Pagination(allCamapaigns, renderCampaigns, filters, featuredSelect, (campaign, filter) => campaign.isFeatured === (filter === "true"))

Confirm(campaignsList, "delete", deleteCampaign, null, "Are you sure you want to delete this campaign?", "Delete Campaign");
Confirm(campaignsList, "approve", approveCampaign, null, "Are you sure you want to approve this campaign?", "Approve Campaign");

campaignsList.addEventListener('click', function (e) {
  e.preventDefault();

  const id = e.target.closest("tr").dataset.id;
  if (!id) return;

  if (e.target.dataset.action === "viewBtn") {
    localStorage.setItem('campaignId', id)
    window.location.href = "/src/campaigns/details/"
  }
})