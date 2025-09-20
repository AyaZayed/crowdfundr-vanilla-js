const initRewardSelect = function (selectEl) {
        const selected = selectEl.querySelector(".select__selected");
        const options = selectEl.querySelector(".select__options");
        const hiddenInput = selectEl.querySelector("input[type=hidden]");

        selected.addEventListener("click", () => {
                options.classList.toggle("select__options--active");
        });

        options.querySelectorAll(".select__option").forEach(option => {
                option.addEventListener("click", () => {
                        const value = option.dataset.value;
                        const text = option.textContent;

                        hiddenInput.value = value;
                        selected.textContent = text;

                        options.classList.remove("select__options--active");
                });
        });
}

export default initRewardSelect