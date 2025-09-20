const Dropdown = function (selectEl, onChange) {
        const selected = selectEl.querySelector(".select__selected");
        const optionsContainer = selectEl.querySelector(".select__options");
        const options = selectEl.querySelectorAll(".select__option");

        selected.addEventListener("click", () => {
                optionsContainer.classList.toggle("select__options--active");
        });

        options.forEach((option) => {
                option.addEventListener("click", () => {
                        const value = option.dataset.value;
                        const text = option.textContent;

                        selected.textContent = text;
                        optionsContainer.classList.remove("select__options--active");

                        if (typeof onChange === "function") {
                                onChange(value, text);
                        }
                });
        });

        document.addEventListener("click", (e) => {
                if (!selectEl.contains(e.target)) {
                        optionsContainer.classList.remove("select__options--active");
                }
        });
}

export default Dropdown