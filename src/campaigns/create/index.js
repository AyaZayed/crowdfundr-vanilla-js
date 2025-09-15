import Alert from "../../scripts/alert"
import { authenticate, getCurrentUser, isNotAdmin } from "../../utils/auth"
import { createCampaign, getCategories } from "../../utils/campaigns"
import { createReward } from "../../utils/rewards"
import { validateCampaignDeadline, validateCampaignDescription, validateCampaignGoal, validateCampaignImage, validateCampaignTitle } from "../../utils/validation"

const createForm = document.querySelector('#createForm')

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

createForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        if (!isValidSubmission()) {
                return
        }

        const formData = new FormData(this)
        const rewards = collectRewards(formData);

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
                const campaign = await createCampaign(data);
                if (rewards.length > 0) {
                        if (!isValidReward()) {
                                return
                        }
                        for (let i = 0; i < rewards.length; i++) {
                                await createReward(rewards[i], campaign.id)
                        }
                }
                await Alert('Added your campaign!')
                window.location.href = '/src/campaigns/'
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

titleCharacters.textContent = 0
descCharacters.textContent = 0

createForm.addEventListener('input', function (e) {
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

createForm.addEventListener("change", function (e) {

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


const rewardCard = `
         <div class="form__group reward card">
                     <h2>Reward</h2>
                     <div class="row">
                        <div class="form__group">
                           <label for="rewardTitle">Reward Title</label>
                           <input
                              type="text"
                              name="rewardTitle"
                              id="rewardTitle"
                              minlength="3"
                              maxlength="60"
                              required
                              class="form__input"
                              placeholder="Ex: Discount on product" />
                           <p class="errors">
                              <span id="rewardTitleErrors"></span>
                              <span id="rewardTitleLength"
                                 ><span id="rewardTitleCharacters"></span
                                 >/60</span
                              >
                           </p>
                        </div>
                        <div class="form__group">
                           <label for="rewardType">Reward Type</label>
                           <select name="rewardType" id="rewardType" required>
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
                        <label for="rewardDesc">Reward Description</label>
                        <textarea
                           type="text"
                           name="rewardDesc"
                           id="rewardDesc"
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
                              ><span id="rewardDescCharacters"></span>/200</span
                           >
                        </p>
                     </div>
                     <div class="row">
                        <div class="form__group">
                           <label for="rewardAmount"
                              >Reward Amount</label
                           >
                           <input
                              type="number"
                              name="rewardAmount"
                              id="rewardAmount"
                              required
                              class="form__input"
                              placeholder="Ex: 10" />
                           <p class="errors">
                              <span id="rewardAmountErrors"></span>
                           </p>
                        </div>
                        <div class="form__group">
                           <label for="rewardDelivery"
                              >Estimated Delivery Date</label
                           >
                           <input
                              type="date"
                              name="rewardDelivery"
                              id="rewardDelivery"
                              required
                              class="form__input" />
                           <p class="errors">
                              <span id="rewardDeliveryErrors"></span>
                           </p>
                        </div>
                     </div>
                  </div>
`

addRewardBtn.addEventListener('click', () => {
        rewardsSection.insertAdjacentHTML('beforeend', rewardCard)
})


function isValidSubmission() {
        let isValid = true
        if (titleErrors.textContent !== '') isValid = false
        if (descErrors.textContent !== '') isValid = false
        if (goalErrors.textContent !== '') isValid = false
        if (deadlineErrors.textContent !== '') isValid = false
        if (imgErrors.textContent !== '') isValid = false

        return isValid
}

function isValidReward() {
        let isValid = true
        if (rewardTitleErrors.textContent !== '') isValid = false
        if (rewardDescErrors.textContent !== '') isValid = false
        if (rewardDeliveryErrors.textContent !== '') isValid = false
        if (rewardAmountErrors.textContent !== '') isValid = false
        return isValid
}

function collectRewards(formData) {
        const rewards = [];
        const rewardTitles = formData.getAll('rewardTitle');
        const rewardTypes = formData.getAll('rewardType');
        const rewardDescs = formData.getAll('rewardDesc');
        const rewardAmounts = formData.getAll('rewardAmount');
        const rewardDeliveries = formData.getAll('rewardDelivery');

        for (let i = 0; i < rewardTitles.length; i++) {
                rewards.push({
                        title: rewardTitles[i],
                        type: rewardTypes[i],
                        description: rewardDescs[i],
                        amount: Number(rewardAmounts[i]),
                        deliveryDate: rewardDeliveries[i],
                });
        }
        return rewards;
}
