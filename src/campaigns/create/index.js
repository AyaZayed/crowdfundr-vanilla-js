import { authenticate, getCurrentUser } from "../../utils/auth"
import { createCampaign } from "../../utils/campaigns"

const createForm = document.querySelector('#createForm')

authenticate()

createForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        const formData = new FormData(this)

        const user = getCurrentUser()

        const data = {
                title: formData.get('title'),
                goal: formData.get('goal'),
                deadline: formData.get('deadline'),
                isApproved: false,
                creatorId: user.id
        }

        try {
                await createCampaign(data)
                alert('Added your campaign!')
                window.location.href = '/src/campaigns/'
        } catch (err) {
                alert(err.message)
        }
})