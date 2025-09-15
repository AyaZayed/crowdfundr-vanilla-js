const Card = (campaign) => `
        <a href="/src/campaigns/details/" class="card" id="${campaign.id}">
                     <img
                        src="${campaign.img}"
                        alt="${campaign.title}" />
                     <div class="card__content">
                        <h3>${campaign.title}</h3>
                        <div class="progress">
                                <div class="progress-bar">
                                        <div class="bar" style="width: ${Math.floor((campaign.raised / campaign.goal) * 100)}%"></div>
                                        </div>
                                <div class="progress-nums">
                                        <span>$${campaign.raised}</span>
                                        <span>${Math.floor((campaign.raised / campaign.goal) * 100)}%</span>
                                </div>
                        </div>
                   </div>
                  </a>
`

export default Card