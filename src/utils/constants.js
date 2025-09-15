const DB_SERVER = 'http://localhost:5000'

export const getSiteName = async function () {
        const res = await fetch(`${DB_SERVER}/settings`)
        const settings = await res.json()
        return settings[0].siteName
}

export const getSiteFee = async function () {
        const res = await fetch(`${DB_SERVER}/settings`)
        const settings = await res.json()
        return settings[0].siteFee
}

export const getMinPledgeAmount = async function () {
        const res = await fetch(`${DB_SERVER}/settings`)
        const settings = await res.json()
        return settings[0].minPledge
}


export const getSiteEmail = async function () {
        const res = await fetch(`${DB_SERVER}/settings`)
        const settings = await res.json()
        return settings[0].siteEmail
}

export const updateSettings = async function (data) {
        const token = localStorage.getItem('token')
        const res = await fetch(`${DB_SERVER}/settings/1`, {
                method: 'PATCH',
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
        })
        const settings = await res.json()
        return settings
}