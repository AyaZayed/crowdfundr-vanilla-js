import { getCurrentUser } from "../../utils/auth";
import { changeUserStatus, changeRole, getAllUsersExcept } from "../../utils/users";
import Confirm from "../scripts/confirm";
import EmptyCase from "../scripts/emptyCase";
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

const loggedUser = await getCurrentUser();

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
      <button data-action="${user.isActive ? "ban" : "unban"}" class="btn ${user.isActive ? " btn-danger-outline" : "btn-success-outline"}">
        ${user.isActive ? `<i class="fa-solid fa-ban"></i> Ban` : "Unban"}
      </button>
    ` : ""}
   ${loggedUser[0].role === 'superAdmin' ? user.isActive ? user.role === 'admin' ? `
      <button data-action="user" class="btn btn-secondary-outline">Remove Admin</button>
    ` : `
    <button data-action="admin" class="btn btn-blue-outline">Make Admin</button>
    ` : '' : ''}
  </td>
`;

export const renderUsers = (users) => {
  usersList.innerHTML = users.map(user => `
                <tr data-id="${user.id}">
                <td>${user.name}</td>
                <td id="email">${user.email}</td>
                <td class="date">${user.created_at}</td>
                ${statusCell(user.isActive)}
                ${roleCell(user.role)}
                ${actionsCell(user)}
                </tr>
  `).join("");
};

const filters = ["name", "email"]

const roleSelect = document.querySelector("#roleSelect")
const isActiveSelect = document.querySelector("#isActiveSelect")

Pagination(allUsers, renderUsers, filters, roleSelect, (user, filter) => user.role === filter);
Pagination(allUsers, renderUsers, filters, isActiveSelect, (user, filter) => user.isActive === (filter === "true"))

Confirm(usersList, "admin", changeRole,
  "admin", "Are you sure you want to make this user an admin?", "Make Admin");
Confirm(usersList, "user", changeRole,
  "user", "Are you sure you want to remove admin role from this user?", "Remove Admin");
Confirm(usersList, "ban", changeUserStatus,
  false, "Are you sure you want to ban this user?", "Ban User");
Confirm(usersList, "unban", changeUserStatus,
  true, "Are you sure you want to unban this user?", "Unban User");


