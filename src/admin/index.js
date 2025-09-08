import { getAllUsersExcept } from "../utils/users";
import { getActiveCampaigns, getAllCampaigns } from "../utils/campaigns"
import { getAllPledges, getAvgBackersPerCamp } from "../utils/pledges"
import EmptyCase from "./scripts/emptyCase";
import { getAllRewards } from "../utils/rewards";

const homeTotalUsers = document.querySelector('.admin__home #homeTotalUsers')
const homeActiveCampaigns = document.querySelector('.admin__home #homeActiveCampaigns')
const homeTotalPledges = document.querySelector('.admin__home #homeTotalPledges')
const homeTotalRewards = document.querySelector('.admin__home #homeTotalRewards')

const [allUsers, activeCampaigns, allCamapaigns, allPledges, allRewards] = await Promise.all([
        getAllUsersExcept(),
        getActiveCampaigns(),
        getAllCampaigns(),
        getAllPledges(),
        getAllRewards()
])

homeTotalUsers.textContent = allUsers && allUsers.length || 0
homeActiveCampaigns.textContent = activeCampaigns && activeCampaigns.length || 0
homeTotalPledges.textContent = allPledges && allPledges.length || 0
homeTotalRewards.textContent = allRewards && allRewards.length || 0

const emptyData = document.querySelector('#emptyData')
const dataInfo = document.querySelector('#dataInfo')

EmptyCase(allUsers, emptyData, dataInfo)

function groupByMonth(data) {
        return data.reduce((acc, curr) => {
                const month = new Date(curr.created_at).getMonth()
                if (!acc[month]) acc[month] = 1;
                else acc[month]++
                return acc
        }, {})
}

const usersByMonth = groupByMonth(allUsers);
const campaignsByMonth = groupByMonth(allCamapaigns);
const pledgesByMonth = groupByMonth(allPledges);

const options = {
        chart: {
                type: 'line',
                height: 400
        },
        series: [
                {
                        name: "Users",
                        data: [...Object.values(usersByMonth), ...Object.entries(usersByMonth)]
                },
                {
                        name: "Pledges",
                        data: [...Object.values(pledgesByMonth), ...Object.entries(pledgesByMonth)]
                }, {
                        name: "Campaigns",
                        data: [...Object.values(campaignsByMonth), ...Object.entries(campaignsByMonth)]
                }
        ],

        xaxis: {
                title: {
                        text: 'Number of items'
                }
        },
        yaxis: {
                type: 'datetime',
                title: {
                        text: 'Months'
                }
        },
}

const chart = new ApexCharts(document.querySelector("#chart"), options)
chart.render()

const avgCampGoal = allCamapaigns && allCamapaigns.reduce((acc, curr) => acc + curr.goal, 0) / allCamapaigns.length || 0
const completedCampaigns = allCamapaigns && allCamapaigns.filter(camp => camp.status === "completed").length || 0

avgCampaignGoal.textContent = `$${avgCampGoal.toFixed(2) || 0}`
successRate.textContent = `${((completedCampaigns / allCamapaigns.length) * 100).toFixed(2)}%`

avgBackers.textContent = await getAvgBackersPerCamp()