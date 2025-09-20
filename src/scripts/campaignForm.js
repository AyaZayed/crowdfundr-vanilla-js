import { authenticate, isNotAdmin } from "../utils/auth";
import { validateCampaignDeadline, validateCampaignDescription, validateCampaignGoal, validateCampaignImage, validateCampaignTitle, validateSelect } from "../utils/validation";
import initRewardSelect from "./rewardDropdown";

authenticate()
isNotAdmin()

export function imgToBase64(file) {
        return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = error => reject(error)
        })
}

export function base64ToImg(base64) {
        return base64.split('data:image/png;base64,')[1]
}

export function rewardCard(i, reward = {}) {

        return `
    <div class="form__group reward card">
      <input type="hidden" name="rewardId" value="${reward.id || ''}" />
      <h2>Reward</h2>
      <div class="row">
        <div class="form__group">
          <label for="rewardTitle${i}">Reward Title</label>
          <input
            type="text"
            name="rewardTitle"
            id="rewardTitle${i}"
            minlength="3"
            maxlength="60"
            class="form__input rewardTitle"
            placeholder="Ex: Discount on product"
            value="${reward.title || ''}" />
          <p class="errors">
            <span id="rewardTitleErrors${i}" class="rewardTitleErrors"></span>
            <span id="rewardTitleLength">
              <span id="rewardTitleCharacters${i}" class="rewardTitleCharacters">
                ${(reward.title || '').length}
              </span>/60
            </span>
          </p>
        </div>
        <div class="form__group">
          <label>Reward Type</label>
         <div class="select rewardType">
                <input type="hidden" name="rewardType" value="${reward.type || ''}">
                <div class="select__selected">${reward.type || 'Reward Type'}</div>
                     <i class="fa-solid fa-chevron-down"></i>
                <div class="select__options">
                <div class="select__option" data-value="">Reward Type</div>
                <div class="select__option" data-value="digital">Digital</div>
                <div class="select__option" data-value="physical">Physical</div>
                <div class="select__option" data-value="recognition">Recognition</div>
                </div>
        </div>
          <p class="errors">
            <span id="rewardTypeErrors${i}" class="rewardTypeErrors"></span>
          </p>
        </div>
      </div>

      <div class="form__group">
        <label for="rewardDesc${i}">Reward Description</label>
        <textarea
          name="rewardDesc"
          id="rewardDesc${i}"
          minlength="3"
          maxlength="200"
          rows="3"
          class="form__input rewardDesc"
          placeholder="Describe your reward">${reward.description || ''}</textarea>
        <p class="errors">
          <span id="rewardDescErrors${i}" class="rewardDescErrors"></span>
          <span id="rewardDescLength">
            <span id="rewardDescCharacters${i}" class="rewardDescCharacters">
              ${(reward.description || '').length}
            </span>/200
          </span>
        </p>
      </div>

      <div class="row">
        <div class="form__group">
          <label for="rewardAmount${i}">Reward Amount</label>
          <input
            type="number"
            name="rewardAmount"
            id="rewardAmount${i}"
            class="form__input rewardAmount"
            value="${reward.amount || ''}"
            placeholder="Ex: 10" />
          <p class="errors">
            <span id="rewardAmountErrors${i}" class="rewardAmountErrors"></span>
          </p>
        </div>

        <div class="form__group">
          <label for="rewardDelivery${i}">Estimated Delivery Date</label>
          <input
            type="date"
            name="rewardDelivery"
            id="rewardDelivery${i}"
            class="form__input rewardDelivery"
            value="${reward.deliveryDate || ''}" />
          <p class="errors">
            <span id="rewardDeliveryErrors${i}" class="rewardDeliveryErrors"></span>
          </p>
        </div>
      </div>
      <button type="button" class="remove btn btn-primary-outline">Remove</button>
    </div>`;
}

export function initAllRewardTypeSelects() {
        document.querySelectorAll(".select").forEach(selectEl => {
                initRewardSelect(selectEl);
        });
}

export const isValidSubmission = () => {
        deadlineErrors.textContent = validateCampaignDeadline(deadline.value)
        titleErrors.textContent = validateCampaignTitle(title.value)
        descErrors.textContent = validateCampaignDescription(desc.value)
        goalErrors.textContent = validateCampaignGoal(goal.value)
        const hiddenImgInput = document.getElementById("imageBase64");
        imgErrors.textContent = imgInput.files[0] && validateCampaignImage(imgInput.files[0]) || validateCampaignImage(hiddenImgInput.value, false)

        const hiddenInput = categoryContainer.querySelector("input[name=category]");
        categoryErrors.textContent = validateSelect(hiddenInput.value);

        const rewardsSection = document.querySelector('#rewardsSection')

        const rewardTitles = document.querySelectorAll('.rewardTitle')
        const rewardDescs = document.querySelectorAll('.rewardDesc')
        const rewardAmounts = document.querySelectorAll('.rewardAmount')
        const selectedRewardTypes = rewardsSection.querySelectorAll('input[name=rewardType]')
        const rewardDeliveries = document.querySelectorAll('.rewardDelivery')

        const rewardTitleErrors = document.querySelectorAll('.rewardTitleErrors')
        const rewardDescErrors = document.querySelectorAll('.rewardDescErrors')
        const rewardAmountErrors = document.querySelectorAll('.rewardAmountErrors')
        const rewardTypeErrors = document.querySelectorAll('.rewardTypeErrors')
        const rewardDeliveryErrors = document.querySelectorAll('.rewardDeliveryErrors')

        if (rewardTitles.length > 0) {
                for (let i = 0; i < rewardTitles.length; i++) {
                        rewardTitleErrors[i].textContent = validateCampaignTitle(rewardTitles[i].value)
                        rewardDescErrors[i].textContent = validateCampaignDescription(rewardDescs[i].value)
                        rewardAmountErrors[i].textContent = validateCampaignGoal(rewardAmounts[i].value)
                        rewardTypeErrors[i].textContent = validateSelect(selectedRewardTypes[i].value)
                        rewardDeliveryErrors[i].textContent = validateCampaignDeadline(rewardDeliveries[i].value)
                }
        }

        if (
                deadlineErrors.textContent !== '' ||
                titleErrors.textContent !== '' ||
                descErrors.textContent !== '' ||
                goalErrors.textContent !== '' ||
                imgErrors.textContent !== '' ||
                categoryErrors.textContent !== '' ||
                [...rewardTitleErrors].some(error => error.textContent) ||
                [...rewardDescErrors].some(error => error.textContent) ||
                [...rewardAmountErrors].some(error => error.textContent) ||
                [...rewardTypeErrors].some(error => error.textContent) ||
                [...rewardDeliveryErrors].some(error => error.textContent)
        ) {
                return false
        }
        return true
}

export function collectRewards(formData) {
        const rewards = [];
        const ids = formData.getAll('rewardId');
        const titles = formData.getAll('rewardTitle');
        const types = formData.getAll('rewardType');
        const descs = formData.getAll('rewardDesc');
        const amounts = formData.getAll('rewardAmount');
        const deliveries = formData.getAll('rewardDelivery');

        for (let i = 0; i < titles.length; i++) {
                rewards.push({
                        id: ids[i] || null,
                        title: titles[i],
                        type: types[i],
                        description: descs[i],
                        amount: Number(amounts[i]),
                        deliveryDate: deliveries[i],
                });
        }
        return rewards;
}

export function initFormListeners(formEl) {
        formEl.addEventListener("input", (e) => {
                if (e.target.id === "title") {
                        titleCharacters.textContent = title.value.length;
                }
                if (e.target.id === "description") {
                        descCharacters.textContent = desc.value.length;
                }
                if (e.target.classList.contains("rewardTitle")) {
                        const i = e.target.id.replace("rewardTitle", "");
                        document.getElementById(`rewardTitleCharacters${i}`).textContent = e.target.value.length;
                }
                if (e.target.classList.contains("rewardDesc")) {
                        const i = e.target.id.replace("rewardDesc", "");
                        document.getElementById(`rewardDescCharacters${i}`).textContent = e.target.value.length;
                }
        });

        formEl.addEventListener("change", (e) => {
                if (e.target.id === "img") {
                        imgErrors.textContent = validateCampaignImage(e.target.files[0]);
                }
                if (e.target.id === "deadline") {
                        deadlineErrors.textContent = validateCampaignDeadline(e.target.value);
                }
                if (e.target.id === "title") {
                        titleErrors.textContent = validateCampaignTitle(e.target.value);
                }
                if (e.target.id === "description") {
                        descErrors.textContent = validateCampaignDescription(e.target.value);
                }
                if (e.target.id === "goal") {
                        goalErrors.textContent = validateCampaignGoal(e.target.value);
                }

                if (e.target.classList.contains("rewardTitle")) {
                        const i = e.target.id.replace("rewardTitle", "");
                        document.getElementById(`rewardTitleErrors${i}`).textContent =
                                validateCampaignTitle(e.target.value);
                }
                if (e.target.classList.contains("rewardDesc")) {
                        const i = e.target.id.replace("rewardDesc", "");
                        document.getElementById(`rewardDescErrors${i}`).textContent =
                                validateCampaignDescription(e.target.value);
                }
                if (e.target.classList.contains("rewardAmount")) {
                        const i = e.target.id.replace("rewardAmount", "");
                        document.getElementById(`rewardAmountErrors${i}`).textContent =
                                validateCampaignGoal(e.target.value);
                }
                if (e.target.classList.contains("rewardType")) {
                        const i = e.target.id.replace("rewardType", "");
                        document.getElementById(`rewardTypeErrors${i}`).textContent =
                                validateSelect(e.target.value);
                }
                if (e.target.classList.contains("rewardDelivery")) {
                        const i = e.target.id.replace("rewardDelivery", "");
                        document.getElementById(`rewardDeliveryErrors${i}`).textContent =
                                validateCampaignDeadline(e.target.value);
                }
        });
}

export function initRewardSection(rewardsSection, addRewardBtn) {
        addRewardBtn.addEventListener("click", () => {
                rewardsSection.insertAdjacentHTML(
                        "beforeend",
                        rewardCard(rewardsSection.children.length + 1)
                );
                initAllRewardTypeSelects();
        });

        rewardsSection.addEventListener("click", (e) => {
                if (e.target.classList.contains("remove")) {
                        rewardsSection.removeChild(e.target.parentElement);
                }
        });

        rewardsSection.addEventListener('input', (e) => {
                if (e.target.classList.contains('rewardTitle')) {
                        const chars = document.getElementById(`rewardTitleCharacters${e.target.id.split('rewardTitle')[1]}`);
                        chars.textContent = e.target.value.length;
                }
                if (e.target.classList.contains('rewardDesc')) {
                        const chars = document.getElementById(`rewardDescCharacters${e.target.id.split('rewardDesc')[1]}`);
                        chars.textContent = e.target.value.length;
                }
        });

        rewardsSection.addEventListener('change', (e) => {
                if (e.target.classList.contains('rewardTitle')) {
                        const errors = document.getElementById(`rewardTitleErrors${e.target.id.split('rewardTitle')[1]}`);
                        errors.textContent = validateCampaignTitle(e.target.value);
                }
                if (e.target.classList.contains('rewardDesc')) {
                        const errors = document.getElementById(`rewardDescErrors${e.target.id.split('rewardDesc')[1]}`);
                        errors.textContent = validateCampaignDescription(e.target.value);
                }
                if (e.target.classList.contains('rewardAmount')) {
                        const errors = document.getElementById(`rewardAmountErrors${e.target.id.split('rewardAmount')[1]}`);
                        errors.textContent = validateCampaignGoal(e.target.value);
                }
                if (e.target.classList.contains('rewardType')) {
                        const errors = document.getElementById(`rewardTypeErrors${e.target.id.split('rewardType')[1]}`);
                        errors.textContent = validateSelect(e.target.value);
                }
                if (e.target.classList.contains('rewardDelivery')) {
                        const errors = document.getElementById(`rewardDeliveryErrors${e.target.id.split('rewardDelivery')[1]}`);
                        errors.textContent = validateCampaignDeadline(e.target.value);
                }
        });
}

export function initImgListeners(imgInput, removeImg, preview) {
        imgInput.addEventListener('change', async function (e) {
                const img = await imgToBase64(e.target.files[0])
                preview.style.display = "block"

                const imgPreview = document.querySelector('#previewImg')
                imgPreview.src = img
        })

        removeImg.addEventListener('click', () => {
                preview.style.display = "none"
                imgInput.value = ""
                imageBase64.value = ""
        })
}
