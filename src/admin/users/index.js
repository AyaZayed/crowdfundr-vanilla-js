import { changeUserStatus, changeRole, getAllUsersExcept } from "../../utils/users";
import EmptyCase from "../scripts/emptyCase";
import Modal from "../scripts/modal";
import Pagination from "../scripts/paginationAndSearch";

const emptyUsers = document.querySelector("#emptyUsers");
const usersInfo = document.querySelector("#usersInfo");

const allUsers = await getAllUsersExcept();
const bannedUsers = allUsers.filter((user) => !user.isActive);
const admins = allUsers.filter((user) => user.role === "admin");

totalUsers.textContent = allUsers && allUsers.length || 0;
totalBanned.textContent = bannedUsers && bannedUsers.length || 0;
totalAdmins.textContent = admins && admins.length || 0;

EmptyCase(allUsers, emptyUsers, usersInfo);

const statusCell = (isActive) => `
  <td class="status">
    <span class="bullet" data-bullet="${isActive ? "success" : "danger"}">
      ${isActive ? "Active" : "Banned"}
    </span>
  </td>
`;

const roleCell = (role) => `
  <td class="role">
    <span class="bullet" data-bullet="${role === "admin" ? "violet" : "outline"}">
      ${role === "admin" ? `<i class="fa-solid fa-shield"></i> Admin` : "User"}
    </span>
  </td>
`;

const actionsCell = (user) => `
  <td class="actions">
    ${user.role !== "admin" ? `
      <button class="btn ${user.isActive ? "banBtn btn-danger-outline" : "btn-success-outline unbanBtn"}">
        ${user.isActive ? `<i class="fa-solid fa-ban"></i> Ban` : "Unban"}
      </button>
    ` : ""}
    ${user.isActive ?
    `<button class="btn ${user.role === "admin" ? "userBtn btn-secondary-outline" : "adminBtn btn-blue-outline"}">
        ${user.role === "admin"
      ? `<i class="fa-solid fa-user-xmark"></i> Remove Admin`
      : `<i class="fa-solid fa-user-check"></i> Make Admin`}
        </button>` : ""
  }
  </td>
`;

export const renderUsers = (users) => {
  usersList.innerHTML = users.map(user => `
                <tr data-id="${user.id}">
                <td>${user.name}</td>
                <td id="email">${user.email}</td>
                <td>${user.created_at}</td>
                ${statusCell(user.isActive)}
                ${roleCell(user.role)}
                ${actionsCell(user)}
                </tr>
  `).join("");
};

const filters = ["name", "email"]

Pagination(allUsers, renderUsers, filters)

Modal(usersList, "adminBtn", changeRole, "admin", "Are you sure you want to make this user an admin?");
Modal(usersList, "userBtn", changeRole, "user", "Are you sure you want to remove this user as admin?");
Modal(usersList, "banBtn", changeUserStatus, false, "Are you sure you want to ban this user?");
Modal(usersList, "unbanBtn", changeUserStatus, true, "Are you sure you want to unban this user?");
