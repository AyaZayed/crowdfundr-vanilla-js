# CrouwdFundr

A full-stack crowdfunding platform built with **HTML, CSS, JavaScript**, and **JSON Server + JSON Server Auth** as a mock backend. Users can launch campaigns, pledge support with mock payments, and admins can manage users and moderate campaigns. Inspired by [Kickstarter](https://www.kickstarter.com) and [GoFundMe](https://www.gofundme.com).

---

## ✨ Features

### 👤 Anonymous Users

-  Browse approved campaigns (`/campaigns?isApproved=true`)
-  Search campaigns by keywords or category

### 🧑 Registered Users

-  **Authentication** (Register/Login via JSON Server Auth)
-  **Campaign Management**
   -  Create campaigns with title, description, goal, deadline, rewards, and image uploads (Base64)
   -  Edit campaign details (PATCH updates)
-  **Pledging**
   -  Submit pledges with amount, reward, campaignId, and mock payment confirmation
   -  View pledge history

### 🛠️ Admin

-  **User Management** → Ban/unban users (`isActive: false`)
-  **Campaign Moderation** → Approve/reject campaigns, delete if necessary
-  **Full Data Access** → View all users, campaigns, and pledges

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/crowdfunding-clone-vanilla-js
cd WeFund
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
npm run dev
```

### 4. Access the App

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to explore the app.
