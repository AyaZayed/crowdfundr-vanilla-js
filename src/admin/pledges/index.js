import EmptyCase from "../scripts/emptyCase"
import { getTotalPledge, getAveragePledge, getAllPledgesWithDetails } from "../../utils/pledges"
import Pagination from "../scripts/paginationAndSearch"

const emptyPledges = document.querySelector('#emptyPledges')
const pledgesInfo = document.querySelector('#pledgesInfo')
const pledgesList = document.querySelector('#pledgesList')
const totalPledges = document.querySelector('#totalPledges')
const totalAmount = document.querySelector('#totalAmount')
const averagePledge = document.querySelector('#averagePledge')

const allPledges = await getAllPledgesWithDetails()
const total = await getTotalPledge()
const average = await getAveragePledge()

totalPledges.textContent = allPledges && allPledges.length || 0
totalAmount.textContent = `$${total || 0}`
averagePledge.textContent = `$${average || 0}`

EmptyCase(allPledges, emptyPledges, pledgesInfo)

const pledgesWithDetails = allPledges.map((pledge) => {
        return {
                ...pledge,
                backerName: pledge.user.name,
                campaignTitle: pledge.campaign.title,
                rewardTitle: pledge.reward.title
        }
})

export const renderPledges = async (pledges) => {
        pledgesList.innerHTML = ""
        pledges.forEach(pledge => {
                pledgesList.innerHTML += `
                <tr>
                        <td>${pledge.backerName}</td>
                        <td>${pledge.campaignTitle}</td>
                        <td>${pledge.amount}</td>
                        <td class="date">${pledge.created_at}</td>
                        <td>${pledge.rewardTitle}</td>
                </tr>
                `
        })
}

const filters = ["amount", "backerName", "campaignTitle", "rewardTitle"]

Pagination(pledgesWithDetails, renderPledges, filters)