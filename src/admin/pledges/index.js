import EmptyCase from "../scripts/emptyCase"
import { getAllPledges, getTotalPledge, getAveragePledge } from "../../utils/pledges"
import { getUserById } from "../../utils/users"
import { getCampaignById } from "../../utils/campaigns"
import Pagination from "../scripts/paginationAndSearch"
import { getRewardById } from "../../utils/rewards"

const emptyPledges = document.querySelector('#emptyPledges')
const pledgesInfo = document.querySelector('#pledgesInfo')
const pledgesList = document.querySelector('#pledgesList')
const totalPledges = document.querySelector('#totalPledges')
const totalAmount = document.querySelector('#totalAmount')
const averagePledge = document.querySelector('#averagePledge')

const allPledges = await getAllPledges()
const total = await getTotalPledge()
const average = await getAveragePledge()

totalPledges.textContent = allPledges && allPledges.length || 0
totalAmount.textContent = `$${total || 0}`
averagePledge.textContent = `$${average || 0}`

EmptyCase(allPledges, emptyPledges, pledgesInfo)

export const renderPledges = async (pledges) => {
        pledgesList.innerHTML = ""
        for (let pledge of pledges) {
                const [backer, campaign, reward] = await Promise.all([
                        getUserById(pledge.userId),
                        getCampaignById(pledge.campaignId),
                        getRewardById(pledge.rewardId)
                ]);

                pledgesList.innerHTML += `
      <tr>
        <td class="email" style="text-transform: lowercase;">
            ${backer.email}
        </td>
        <td>${campaign.title}</td>
        <td>$${pledge.amount}</td>
        <td>${pledge.created_at}</td>
        <td>${reward ? reward.title : `<span class="text-muted">No reward</span>`}</td>
      </tr>
    `;
        }
};

const filters = ["amount"]

Pagination(allPledges, renderPledges, filters)