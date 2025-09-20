import { approveCampaign, featureCamapaign, getActiveCampaigns, getAllCampaigns, getCompletedCampaigns, rejectCampaign } from "../../utils/campaigns"
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
    <span class="bullet" data-bullet="${status === "active" ? "success" : status === "completed" ? "primary" : status === "rejected" ? "danger" : "violet"}">
      ${status === "active" ? "Active" : status === "completed" ? "Completed" : status === "rejected" ? "Rejected" : "Pending"}
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
    <input type="checkbox" data-action="feature" ${isFeatured ? "checked" : ""}>
    <span class="slider" id="featureSwitch"></span>
  </label>
  </td>
`;

campaignsList.addEventListener('click', async function (e) {
  const id = e.target.closest("tr").dataset.id;

  if (!id) return;

  if (e.target.id === 'featureSwitch') {
    const input = e.target.closest("label").querySelector("input")

    input.checked = !input.checked
    await featureCamapaign(id, input.checked)
  }
})

const actionsCell = (isApproved, status) => `
  <td class="actions">
   ${isApproved ? `
    <a href="/src/campaigns/details/" target="_blank" data-action="view" class="btn btn-secondary-outline">
      <i class="fa-solid fa-eye"></i> View
    </a>
    ` : status === "rejected" ? `` : `<button data-action="approve" class=" btn btn-success-outline"><i class="fa-solid fa-check"></i> Approve</button></button> 
      <button data-action="reject" class=" btn btn-danger-outline">
      <i class="fa-solid fa-xmark"></i> Reject
    </button>
    `
  }
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
                        ${actionsCell(campaign.isApproved, campaign.status)}
                </tr>
  `).join("");
};

const filters = ["title"]

const statusSelect = document.querySelector("#statusSelect")
const featuredSelect = document.querySelector("#featuredSelect")

Pagination(allCamapaigns, renderCampaigns, filters, statusSelect, (campaign, filter) => campaign.status === filter)
Pagination(allCamapaigns, renderCampaigns, filters, featuredSelect, (campaign, filter) => campaign.isFeatured === (filter === "true"))


Confirm(campaignsList, "reject", rejectCampaign, null, "Are you sure you want to reject this campaign?", "Reject Campaign");
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