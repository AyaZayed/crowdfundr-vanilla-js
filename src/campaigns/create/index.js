import Alert from "../../scripts/alert"
import { collectRewards, initCategorySelect, initFormListeners, initRewardSection, isValidSubmission } from "../../scripts/campaignForm"
import { authenticate, getCurrentUser, isNotAdmin } from "../../utils/auth"
import { createCampaign } from "../../utils/campaigns"
import { createReward } from "../../utils/rewards"

const createForm = document.querySelector('#createForm')

authenticate()
isNotAdmin()

await initCategorySelect(document.querySelector('#categorySelect'))

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
                        for (let i = 0; i < rewards.length; i++) {
                                await createReward(rewards[i], campaign.id)
                        }
                }
                await Alert('Added your campaign!')
                window.location.href = '/src/profile/'
        } catch (err) {
                await Alert(err.message)
        }
})

initFormListeners(createForm)
initRewardSection(document.querySelector('#rewardsSection'), document.querySelector('#addRewardBtn'))