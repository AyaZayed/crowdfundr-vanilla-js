import { getAllUsersExcept } from "../utils/users";
import { getActiveCampaigns, getAllCampaigns } from "../utils/campaigns"
import { getAllPledges } from "../utils/pledges"
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

EmptyCase([], emptyData, dataInfo)
