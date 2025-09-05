import { allPledges } from ".."

const emptyPledges = document.querySelector('#emptyPledges')
const pledgesInfo = document.querySelector('#pledgesInfo')
const pledgesList = document.querySelector('#pledgesList')
const totalPledges = document.querySelector('#totalPledges')
const totalAmount = document.querySelector('#totalAmount')
const averagePledge = document.querySelector('#averagePledge')

totalPledges.textContent = allPledges.length

if (allPledges.length === 0) {
        emptyPledges.style.display = "flex";
        pledgesInfo.style.display = "none";
} else {
        emptyPledges.style.display = "none";
        pledgesInfo.style.display = "block";
}