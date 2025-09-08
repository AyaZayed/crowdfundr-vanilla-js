const Modal = function (container, btnClass, action, param = null, msg) {
        container.addEventListener('click', async function (e) {
                const id = e.target.closest("tr").dataset.id;
                if (!id) return;

                const confirmAction = async function (action) {
                        const confirmed = confirm(msg);
                        if (confirmed) {
                                await action(id, param);
                        }
                }

                if (e.target.classList.contains(btnClass)) {
                        await confirmAction(action);
                        window.location.reload();
                }
        })
}

export default Modal