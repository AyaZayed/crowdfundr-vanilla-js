import { getCurrentUser } from "../../utils/auth";
import { changeUserStatus, changeRole, getAllUsersExcept } from "../../utils/users";

const emptyUsers = document.querySelector("#emptyUsers");
const usersInfo = document.querySelector("#usersInfo");
const usersList = document.querySelector("#usersList");
const totalUsers = document.querySelector("#totalUsers");
const totalBanned = document.querySelector("#totalBanned");
const totalAdmins = document.querySelector("#totalAdmins");

const currentUser = await getCurrentUser();

const allUsers = await getAllUsersExcept(currentUser[0].id);
const bannedUsers = allUsers.filter((user) => !user.isActive);
const admins = allUsers.filter((user) => user.role === "admin");

totalUsers.textContent = allUsers.length;
totalBanned.textContent = bannedUsers.length;
totalAdmins.textContent = admins.length;

if (allUsers.length === 0) {
        emptyUsers.style.display = "flex";
        usersInfo.style.display = "none";
} else {
        emptyUsers.style.display = "none";
        usersInfo.style.display = "block";
}

usersList.innerHTML = allUsers
        .map(
                (user) => `
                <tr data-id="${user.id}">
                        <td>${user.name}</td>
                        <td id="email">${user.email}</td>
                        <td>${user.joinDate}</td>
                        <td>${user.isActive ? "Active" : "Banned"}</td>
                        <td>${user.role}</td>
                        <td>
                                <button class="btn  ${user.role === "admin" ? "userBtn btn-secondary-outline" : "adminBtn btn-blue-outline"}"
                                        >
                                        ${user.role === "admin" ? "Remove Admin" : "Make Admin"}
                                </button>
                                 ${user.role === 'admin' ? '' : `
                                        <button class="btn ${user.isActive ? "banBtn btn-danger-outline" : "btn-success-outline unbanBtn"}"
                                        >
                                        ${user.isActive ? `<i class="fa-solid fa-ban"></i> Ban` : "Unban"}
                                </button>
                                        `}
                        </td>
                </tr>
        `
        )
        .join("");

usersList.addEventListener('click', async function (e) {
        const id = e.target.closest("tr").dataset.id;
        if (!id) return;

        if (e.target.classList.contains("adminBtn")) {
                await makeAdmin(id);
                window.location.reload();

        } else if (e.target.classList.contains("userBtn")) {
                await makeUser(id);
                window.location.reload();

        } else if (e.target.classList.contains("banBtn")) {
                await banUser(id);
                window.location.reload();

        } else if (e.target.classList.contains("unbanBtn")) {
                await unbanUser(id);
                window.location.reload();
        }

})

async function makeAdmin(id) {
        const canBeAdmin = confirm("Are you sure you want to make this user an admin?");
        if (canBeAdmin) {
                await changeRole(id, "admin");
        }
}

async function makeUser(id) {
        const canBeUser = confirm("Are you sure you want to remove this user as admin?");
        if (canBeUser) {
                await changeRole(id, "user");
        }
}

async function banUser(id) {
        const canBeBanned = confirm("Are you sure you want to ban this user?");
        if (canBeBanned) {
                await changeUserStatus(id, false);
        }
}

async function unbanUser(id) {
        const canBeUnbanned = confirm("Are you sure you want to unban this user?");
        if (canBeUnbanned) {
                await changeUserStatus(id, true);
        }
}