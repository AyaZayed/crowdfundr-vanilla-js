import { authenticate, getCurrentUser, isNotAdmin } from "../utils/auth";
import { getCampaignById } from "../utils/campaigns";
import { makePledge } from "../utils/pledges";
import { isValidName, validatePledgeAmount, validatePledgeCard, validatePledgeCVV, validatePledgeExpiry } from "../utils/validation";
import { getSiteFee } from "../utils/constants"
import { getCampaignRewards } from "../utils/rewards";
import Alert from "../scripts/alert";

authenticate();
isNotAdmin();

const campaignImg = document.querySelector("#campaignImg");
const campaignTitle = document.querySelector("#campaignTitle");

const campaignId = localStorage.getItem("campaignId");
const user = await getCurrentUser();

const campaign = await getCampaignById(campaignId);

const rewards = await getCampaignRewards(campaignId);

campaignImg.src = campaign.img;
campaignTitle.textContent = campaign.title;

const pledgeForm = document.querySelector("#pledgeForm");

pledgeForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!isValidSubmission()) {
                return
        }

        const formData = new FormData(pledgeForm);

        const data = {
                campaignId: campaignId,
                amount: Number(formData.get("amount")),
                created_at: new Date().toLocaleDateString(),
                userId: user[0].id,
                created_at: new Date().toLocaleDateString(),
                rewardId: Number(formData.get("rewardId")) === null ? 0 : Number(formData.get("rewardId")),
        };

        try {
                await makePledge(data)
                await Alert('Thank you for your pledge!')
                window.location.href = "/src/campaigns/details/";

        } catch (err) {
                await Alert(err.message)
        }

});

const pledgeAmount = document.querySelector("#total");

amount.addEventListener("input", function () {
        updateTotals(this.value);
});

amount.addEventListener("change", function () {
        const amountVal = this.value.trim()
        const msgs = validatePledgeAmount(Number(amountVal))
        amountErrors.textContent = msgs.join(", ")
});

card.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        value = value.substring(0, 16);

        if (value.length >= 4) {
                this.value = value.slice(0, 4) + " " + value.slice(4, 8) + " " + value.slice(8, 12) + " " + value.slice(12);
        } else {
                this.value = value;
        }
});

card.addEventListener("change", () => {
        const cardVal = card.value;
        const msgs = validatePledgeCard(cardVal);

        cardErrors.textContent = msgs.join(", ");
});

cvv.addEventListener("change", () => {
        const cvvVal = cvv.value;
        const msgs = validatePledgeCVV(cvvVal);

        cvvErrors.textContent = msgs.join(", ");
});

expiry.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        value = value.substring(0, 4);

        if (value.length >= 3) {
                this.value = value.slice(0, 2) + "/" + value.slice(2);
        } else {
                this.value = value;
        }
});

expiry.addEventListener("change", function () {
        const errors = validatePledgeExpiry(this.value);
        if (errors.length > 0) {
                expiryErrors.textContent = errors[0];
        } else {
                expiryErrors.textContent = "";
        }
});

cardName.addEventListener("change", function () {
        const nameVal = this.value;
        const msgs = isValidName(nameVal);
        cardNameErrors.textContent = msgs.join(", ");
});

function isValidSubmission() {
        return amountErrors.textContent === '' &&
                cardErrors.textContent === '' &&
                cvvErrors.textContent === '' &&
                expiryErrors.textContent === '' &&
                cardNameErrors.textContent === ''
}

const rewardCard = (reward) => {
        return `
                <div class="rewardCard form__group">
                        <label for="${reward.id}">${reward.title}</label>
                        <span class="rewardCard__amount">$${reward.amount}</span>
                        <input type="radio" name="rewardId" id="$${reward.id}" value="${reward.id || 0}" />
                </div>
        `
}

if (rewards.length > 0) {
        const rewardInputs = document.querySelector("#rewardInputs");
        for (let reward of rewards) {
                rewardInputs.insertAdjacentHTML('beforeend', rewardCard(reward))
                rewardInputs.addEventListener('change', () => {
                        updateTotals(reward.amount)
                        amount.value = reward.amount
                })
        }
}

async function updateTotals(val) {
        const siteFee = await getSiteFee();
        pledgeAmount.textContent = `$${val}`;
        fee.textContent = `$${(Number(val) * siteFee).toFixed(2)}`;
        totalWithFee.textContent = `$${(Number(val) * (1 + siteFee)).toFixed(2)}`;
}