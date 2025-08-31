import { getUser } from "../../utils/auth"
import { createCampaign } from "../../utils/campaigns"

const createForm = document.querySelector('#createForm')

if (!getUser()) {
        window.location.href = "/src/login/";
}

createForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        const formData = new FormData(this)
        console.log(formData);

        const user = getUser()
        console.log(user);

        const data = {
                title: formData.get('title'),
                goal: formData.get('goal'),
                deadline: formData.get('deadline'),
                isApproved: false,
                creatorId: user.id
        }
        console.log(data);

        try {
                await createCampaign(data)
                alert('Added your campaign!')
                window.location.href = '/src/campaigns/'
        } catch (err) {
                alert(err.message)
        }
})