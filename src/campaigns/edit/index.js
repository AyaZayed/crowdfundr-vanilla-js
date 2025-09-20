import { authenticate, getCurrentUser, isNotAdmin } from "../../utils/auth"
import { createReward, editReward, getCampaignRewards } from "../../utils/rewards"
import Alert from "../../scripts/alert"
import { base64ToImg, collectRewards, imgToBase64, initAllRewardTypeSelects, initFormListeners, initImgListeners, initRewardSection, isValidSubmission, rewardCard } from "../../scripts/campaignForm"
import { editCampaign, getCampaignById } from "../../utils/campaigns"
import { initCategorySelect } from "../../scripts/categoryDropdown"

authenticate()
isNotAdmin()

const campaign = await getCampaignById(localStorage.getItem('campaignId'))
const user = await getCurrentUser()

if (user[0].id !== campaign.creatorId) {
        await Alert('You are not allowed to edit this campaign!')
        window.location.href = '/src/campaigns/'
}

const rewards = await getCampaignRewards(campaign.id);

const rewardsSection = document.querySelector('#rewardsSection')

for (let i = 0; i < rewards.length; i++) {
        rewardsSection.insertAdjacentHTML('beforeend', rewardCard(i + 1, rewards[i]));
        initAllRewardTypeSelects();
}

title.value = campaign.title
desc.value = campaign.description
goal.value = campaign.goal
deadline.value = campaign.deadline

const preview = document.getElementById("preview");
const previewImg = document.getElementById("previewImg");
const hiddenImgInput = document.getElementById("imageBase64");

preview.style.display = "block"
previewImg.src = campaign.img
hiddenImgInput.value = campaign.img;

titleCharacters.textContent = title.value.length
descCharacters.textContent = desc.value.length


const categoryContainer = document.querySelector('#categoryContainer');

initCategorySelect(categoryContainer, {
        selectedCategory: campaign.category,
        name: "category",
        formMode: true
});

const editForm = document.querySelector('#editForm')

editForm.addEventListener('submit', async function (e) {
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
                img: hiddenImgInput.value || await imgToBase64(formData.get('img')),
        }

        try {
                if (rewards.length > 0) {
                        for (let i = 0; i < rewards.length; i++) {
                                rewards[i].campaignId = campaign.id;
                                if (rewards[i].id) {
                                        await editReward(rewards[i], rewards[i].id);
                                } else {
                                        await createReward(rewards[i], campaign.id);
                                }
                        }
                }
                await editCampaign(campaign.id, data);
                await Alert('Updated your campaign!')
                window.location.href = '/src/campaigns/details/'
        } catch (err) {
                await Alert(err.message)
        }
})

initFormListeners(editForm)
initRewardSection(document.querySelector('#rewardsSection'), document.querySelector('#addRewardBtn'))

imgInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (file) {
                const base64 = await imgToBase64(file);
                previewImg.src = base64;
                hiddenImgInput.value = base64;
        }
});

initImgListeners(imgInput, removeImg, preview)