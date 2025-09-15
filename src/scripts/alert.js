function Alert(message, title = "Alert") {
        const overlay = document.getElementById("customAlert");
        const alertTitle = document.getElementById("alertTitle");
        const alertMessage = document.getElementById("alertMessage");
        const alertBtn = document.getElementById("alertBtn");

        alertTitle.textContent = title;
        alertMessage.textContent = message;

        overlay.classList.remove("hidden");

        return new Promise((resolve) => {
                alertBtn.onclick = () => {
                        overlay.classList.add("hidden");
                        resolve(true);
                };
        });
}

export default Alert;