import { getApprovedCampaigns } from "../utils/campaigns"

const campaignsDiv = document.querySelector('#campaigns')

getApprovedCampaigns().then((camps) => {
        for (let camp of camps) {
                campaignsDiv.insertAdjacentHTML('beforeend',
                        `<div class='campaign'>${camp.title}</div>`
                )
        }
})