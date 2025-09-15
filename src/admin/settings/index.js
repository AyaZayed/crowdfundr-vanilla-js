import Alert from "../../scripts/alert"
import { getMinPledgeAmount, getSiteEmail, getSiteFee, getSiteName, updateSettings } from "../../utils/constants"

const siteNameInput = document.querySelector('#siteNameInput')
const siteFee = document.querySelector('#siteFee')
const minPledge = document.querySelector('#minPledge')
const siteEmail = document.querySelector('#siteEmail')

siteNameInput.value = await getSiteName()
siteFee.value = await getSiteFee()
minPledge.value = await getMinPledgeAmount()
siteEmail.value = await getSiteEmail()

settingsForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        const formData = new FormData(this)

        const data = {
                siteName: formData.get('siteName'),
                siteFee: Number(formData.get('siteFee')),
                minPledge: Number(formData.get('minPledge')),
                siteEmail: formData.get('siteEmail')
        }

        console.log(data);
        try {
                await updateSettings(data)
                await Alert('Settings updated successfully!')
                window.location.href = "/src/admin/settings/";
        } catch (err) {
                await Alert(err.message)
        }
})

