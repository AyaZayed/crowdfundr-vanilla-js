const Confirm = function (container, trigger, action, param = null, msg, title = "") {
        container.addEventListener('click', async function (e) {
                const id = e.target.closest("tr").dataset.id;
                if (!id) return;

                if (e.target.dataset.action === trigger) {
                        const confirm = await customConfirm(title, msg)
                        if (confirm) {
                                await action(id, param)
                                window.location.reload()
                        }
                }
        })
}

function customConfirm(title, message) {
        return new Promise((resolve) => {
                const overlay = document.getElementById("customConfirm");
                const confirmTitle = document.getElementById("confirmTitle");
                const confirmMessage = document.getElementById("confirmMessage");
                const confirmOk = document.getElementById("confirmOk");
                const confirmCancel = document.getElementById("confirmCancel");

                confirmTitle.textContent = title;
                confirmMessage.textContent = message;

                overlay.classList.remove("hidden");

                const cleanup = () => {
                        overlay.classList.add("hidden");
                        confirmOk.removeEventListener("click", onOk);
                        confirmCancel.removeEventListener("click", onCancel);
                };

                const onOk = () => {
                        cleanup();
                        resolve(true);
                };

                const onCancel = () => {
                        cleanup();
                        resolve(false);
                };

                confirmOk.addEventListener("click", onOk);
                confirmCancel.addEventListener("click", onCancel);
        });
}

export default Confirm