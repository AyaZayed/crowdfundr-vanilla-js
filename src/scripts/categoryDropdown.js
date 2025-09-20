import { getCategories } from "../utils/campaigns";
import Dropdown from "./dropdown";

export async function initCategorySelect(container, {
        selectedCategory = "all",
        name = "category",
        formMode = false,
        onChange = null
} = {}) {
        const categories = await getCategories();

        let html = `
    <div class="select">
      ${formMode ? `<input type="hidden" name="${name}" value="${selectedCategory}" />` : ""}
      <div class="select__selected">${selectedCategory && selectedCategory !== "all"
                        ? selectedCategory
                        : "Categories"
                }</div>
                     <i class="fa-solid fa-chevron-down"></i>

      <ul class="select__options">
        <li class="select__option" data-value="all">Categories</li>
        ${categories
                        .map(
                                (category) => `
          <li 
            class="select__option ${category === selectedCategory ? "select__option--active" : ""
                                        }" 
            data-value="${category}">
            ${category}
          </li>`
                        )
                        .join("")}
      </ul>
    </div>
  `;

        container.innerHTML = html;

        const selectEl = container.querySelector(".select");
        const hiddenInput = formMode ? selectEl.querySelector("input[type=hidden]") : null;

        Dropdown(selectEl, (value, text) => {
                if (formMode && hiddenInput) {
                        hiddenInput.value = value;
                }

                if (typeof onChange === "function") {
                        onChange(value, text);
                }
        });
}