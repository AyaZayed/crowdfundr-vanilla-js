import { getCurrentUser } from "../utils/auth";
import { getUserCampaigns } from "../utils/campaigns";
import { getUserPledges } from "../utils/pledges";

const isAdmin = localStorage.getItem("isAdmin")

const user = await getCurrentUser();

const userCampaigns = user && await getUserCampaigns(user[0].id);
const userPledges = user && await getUserPledges(user[0].id);

const hasCampaigns = userCampaigns && userCampaigns.length > 0;
const hasPledges = userPledges && userPledges.length > 0;

const renderHeader = () => `
  <a href="/" class="header__logo">
    <img
      src="/images/logo.png"
      alt="black elephant logo"
      width="50"
    />
    <span id="siteName">Crowdfundr</span>
  </a>

  <nav class="nav">
    <div id="menuBtn">
      <i class="fa-solid fa-bars"></i>
    </div>

    <ul class="nav--list">
      <a class="nav--list__link" href="/src/about/">About</a>
      <a class="nav--list__link" href="/src/campaigns/">Campaigns</a>

     ${userBtns(user, isAdmin)}
    </ul>
  </nav>
`;

const userBtns = (user, isAdmin) => {
   if (user) {
      if (isAdmin === "true") {
         return `
            <a href="/" id="logoutBtn" class="nav--list__link">Logout</a>
            <a href="/src/admin/" class="btn btn-primary">Dashboard</a>
         `
      } else {
         return `
             <li class="nav-item dropdown" id="profile">
               <a href="/src/profile/" class="nav--list__link dropdown-toggle">Profile <i class="fa-solid fa-chevron-down"></i></a>
               <ul class="dropdown-menu">
                  ${hasCampaigns ? `<li><a href="/src/profile/#activeCampaigns/" id="myCampaigns">My Campaigns</a></li>` : ""}
                  ${hasPledges ? `<li><a href="/src/profile/#activePledges/" id="myPledges">My Pledges</a></li>` : ""}
                  <li><a href="/src/profile/#settings/" id="profileSettings">Settings</a></li>
                  <li><a href="/" id="logoutBtn">Logout</a></li>
               </ul>
            </li>
            <a href="/src/campaigns/create/" class="btn btn-primary">Launch Campaign</a>
         `
      }
   } else {
      return `
         <a href="/src/login/" class="nav--list__link" >Login</a>
         <a href="/src/campaigns/create/" class="btn btn-primary">Launch Campaign</a>
      `
   }
}

document.getElementById("header").innerHTML = renderHeader()

const navList = document.querySelector('.nav .nav--list')

header.addEventListener('click', (e) => {
   if (e.target.id === "logoutBtn") {
      localStorage.removeItem("token")
      window.location.href = "/"
   }
   if (e.target.id === "menuBtn" || e.target.classList.contains('fa-bars')) {
      navList.classList.toggle('open')
   }
   if (e.target.id === "myCampaigns") {
      localStorage.setItem('active', "campaigns")
   }
   if (e.target.id === "myPledges") {
      localStorage.setItem('active', "pledges")
   }
   if (e.target.id === "profileSettings") {
      localStorage.setItem('active', "settings")
   }
})

const dropdownToggle = document.querySelector('.dropdown-toggle')

dropdownToggle && dropdownToggle.addEventListener("click", function (e) {
   e.preventDefault();
   this.parentElement.classList.toggle("open");
});

