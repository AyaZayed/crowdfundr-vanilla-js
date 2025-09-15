import { authenticate, getCurrentUser, isNotAdmin } from "../../utils/auth"
import { editCampaign, getCampaignById, getCategories } from "../../utils/campaigns"
import { createReward, editReward, getCampaignRewards } from "../../utils/rewards"
import { validateCampaignDeadline, validateCampaignDescription, validateCampaignGoal, validateCampaignImage, validateCampaignTitle } from "../../utils/validation"
import Alert from "../../scripts/alert"

authenticate()
isNotAdmin()

const categoryOptions = (categories) => {
        let options = ''
        categories.forEach(category => {
                options += `<option value="${category}">${category}</option>`
        })
        return options
}

const categories = await getCategories()
categorySelect.innerHTML = categoryOptions(categories)

const campaign = await getCampaignById(localStorage.getItem('campaignId'))

const user = await getCurrentUser()

if (user[0].id !== campaign.creatorId) {
        await Alert('You are not allowed to edit this campaign!')
        window.location.href = '/src/campaigns/'
}

title.value = campaign.title
desc.value = campaign.description
goal.value = campaign.goal
deadline.value = campaign.deadline
categorySelect.value = campaign.category

titleCharacters.textContent = title.value.length
descCharacters.textContent = desc.value.length

const editForm = document.querySelector('#editForm')

editForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        if (!isValidSubmission()) {
                return
        }

        const formData = new FormData(this)
        const rewards = collectRewards(formData);
        console.log(rewards);


        const user = await getCurrentUser()

        const data = {
                title: formData.get('title'),
                goal: Number(formData.get('goal')),
                deadline: formData.get('deadline'),
                description: formData.get('description'),
                category: formData.get('category'),
                isApproved: false,
                isFeatured: false,
                raised: 0,
                status: 'pending',
                creatorId: user[0].id,
                created_at: new Date().toLocaleDateString(),
                img: await imgToBase64(formData.get('img')),
        }

        try {
                const campaign = await editCampaign(data);
                for (let i = 0; i < rewards.length; i++) {
                        rewards[i].campaignId = campaign.id;

                        if (rewards[i].id) {
                                await editReward(rewards[i], rewards[i].id);
                                await Alert('Updated your reward!')
                        } else {
                                await createReward(rewards[i]);
                        }
                }
                await Alert('Updated your campaign!')
                window.location.href = '/src/campaigns/details/'
        } catch (err) {
                await Alert(err.message)
        }
})

function imgToBase64(file) {
        return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = error => reject(error)
        })
}

editForm.addEventListener('input', function (e) {
        titleCharacters.textContent = title.value.split('').length
        descCharacters.textContent = desc.value.split('').length

        if (e.target.id === 'rewardTitle') {
                const titleVal = e.target.value
                rewardTitleCharacters.textContent = titleVal.split('').length
        }

        if (e.target.id === 'rewardDesc') {
                const descVal = e.target.value
                rewardDescCharacters.textContent = descVal.split('').length
        }
})

editForm.addEventListener("change", function (e) {

        if (e.target.id === 'img') {
                const msgs = validateCampaignImage(e.target.files[0])
                imgErrors.textContent = msgs
        } if (e.target.id === 'deadline') {
                const msgs = validateCampaignDeadline(e.target.value)
                deadlineErrors.textContent = msgs
        } if (e.target.id === 'title') {
                const msgs = validateCampaignTitle(e.target.value)
                titleErrors.textContent = msgs
        } if (e.target.id === 'description') {
                const msgs = validateCampaignDescription(e.target.value)
                descErrors.textContent = msgs
        } if (e.target.id === 'goal') {
                const msgs = validateCampaignGoal(e.target.value)
                goalErrors.textContent = msgs
        } if (e.target.id === 'rewardTitle') {
                const msgs = validateCampaignTitle(e.target.value)
                rewardTitleErrors.textContent = msgs
        } if (e.target.id === 'rewardDesc') {
                const msgs = validateCampaignDescription(e.target.value)
                rewardDescErrors.textContent = msgs
        } if (e.target.id === 'rewardDelivery') {
                const msgs = validateCampaignDeadline(e.target.value)
                rewardDeliveryErrors.textContent = msgs
        } if (e.target.id === 'rewardAmount') {
                const msgs = validateCampaignGoal(e.target.value)
                rewardAmountErrors.textContent = msgs
        }
})

const rewardCard = (i, reward = {}) => {
        console.log(reward.id);

        return `
                <div class="form__group reward card">
                      <input type="hidden" name="rewardId" value="${reward.id || ''}" />
                        <h2>Reward</h2>
                        <div class="row">
                           <div class="form__group">
                              <label for="${"rewardTitle" + i}">Reward Title</label>
                              <input
                                 type="text"
                                 name="rewardTitle"
                                 id="${"rewardTitle" + i}"
                                 minlength="3"
                                 maxlength="60"
                                 required
                                 class="form__input"
                                 placeholder="Ex: Discount on product" />
                              <p class="errors">
                                 <span id="rewardTitleErrors"></span>
                                 <span id="rewardTitleLength"
                                    ><span id="${"rewardTitleCharacters" + i}"></span
                                    >/60</span
                                 >
                              </p>
                           </div>
                           <div class="form__group">
                              <label for="${"rewardType" + i}">Reward Type</label>
                              <select
                                 name="rewardType"
                                 id="${"rewardType" + i}"
                                 required>
                                 <option value="all">Reward Type</option>
                                 <option value="digital">Digital</option>
                                 <option value="physical">Physical</option>
                                 <option value="recognition">Recognition</option>
                              </select>

                              <p class="errors">
                                 <span id="rewardTypeErrors"></span>
                              </p>
                           </div>
                        </div>
                        <div class="form__group">
                           <label for="${"rewardDesc" + i}">Reward Description</label>
                           <textarea
                              type="text"
                              name="rewardDesc"
                              id="${"rewardDesc" + i}"
                              minlength="3"
                              maxlength="200"
                              rows="3"
                              required
                              class="form__input"
                              style="resize: none"
                              placeholder="Describe your reward in detail"></textarea>

                           <p class="errors">
                              <span id="rewardDescErrors"></span>
                              <span id="rewardDescLength"
                                 ><span id="${"rewardDescCharacters" + i}"></span
                                 >/200</span
                              >
                           </p>
                        </div>
                        <div class="row">
                           <div class="form__group">
                              <label for="${"rewardAmount" + i}">Reward Amount</label>
                              <input
                                 type="number"
                                 name="rewardAmount"
                                 id="${"rewardAmount" + i}"
                                 required
                                 class="form__input"
                                 placeholder="Ex: 10" />
                              <p class="errors">
                                 <span id="rewardAmountErrors"></span>
                              </p>
                           </div>
                           <div class="form__group">
                              <label for="${"rewardDelivery" + i}"
                                 >Estimated Delivery Date</label
                              >
                              <input
                                 type="date"
                                 name="rewardDelivery"
                                 id="${"rewardDelivery" + i}"
                                 required
                                 class="form__input" />
                              <p class="errors">
                                 <span id="rewardDeliveryErrors"></span>
                              </p>
                           </div>
                        </div>
                     </div>
        `
}

const rewards = await getCampaignRewards(campaign.id)

for (let i = 0; i < rewards.length; i++) {
        rewardsSection.insertAdjacentHTML('beforeend', rewardCard(i, rewards[i]))

        const rewardTitle = document.getElementById(`rewardTitle${i}`)
        const rewardType = document.getElementById(`rewardType${i}`)
        const rewardDesc = document.getElementById(`rewardDesc${i}`)
        const rewardAmount = document.getElementById(`rewardAmount${i}`)
        const rewardDelivery = document.getElementById(`rewardDelivery${i}`)
        const rewardTitleCharacters = document.getElementById(`rewardTitleCharacters${i}`)
        const rewardDescCharacters = document.getElementById(`rewardDescCharacters${i}`)

        rewardTitle.value = rewards[i].title
        rewardType.value = rewards[i].type.toLowerCase()
        rewardDesc.value = rewards[i].description
        rewardAmount.value = rewards[i].amount
        rewardDelivery.value = rewards[i].deliveryDate

        rewardTitleCharacters.textContent = rewardTitle.value.length
        rewardDescCharacters.textContent = rewardDesc.value.length
}

addRewardBtn.addEventListener('click', () => {
        rewardsSection.insertAdjacentHTML('beforeend', rewardCard)
})

function isValidSubmission() {
        return titleErrors.textContent === '' &&
                descErrors.textContent === '' &&
                goalErrors.textContent === '' &&
                deadlineErrors.textContent === '' &&
                imgErrors.textContent === ''
                && rewardTitleErrors.textContent === '' &&
                rewardDescErrors.textContent === ''
                && rewardDeliveryErrors.textContent === ''
                && rewardAmountErrors.textContent === ''
}

function collectRewards(formData) {
        const rewards = [];
        const rewardIds = formData.getAll('rewardId');
        const rewardTitles = formData.getAll('rewardTitle');
        const rewardTypes = formData.getAll('rewardType');
        const rewardDescs = formData.getAll('rewardDesc');
        const rewardAmounts = formData.getAll('rewardAmount');
        const rewardDeliveries = formData.getAll('rewardDelivery');

        for (let i = 0; i < rewardTitles.length; i++) {
                rewards.push({
                        id: rewardIds[i] || null,
                        title: rewardTitles[i],
                        type: rewardTypes[i],
                        description: rewardDescs[i],
                        amount: Number(rewardAmounts[i]),
                        deliveryDate: rewardDeliveries[i],
                });
        }
        return rewards;
}
