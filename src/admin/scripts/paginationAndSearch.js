
const Pagination = function (data, renderData, filters) {
        const prevBtn = document.querySelector('#prevBtn')
        const nextBtn = document.querySelector('#nextBtn')
        const pageSpan = document.querySelector('#page')
        const pagesSpan = document.querySelector('#pages')
        const searchInput = document.querySelector('#searchInput')

        let currentPage = 1;
        const dataPerPage = 5;
        const shownUsers = data.slice(0, dataPerPage);
        renderData(shownUsers);

        pageSpan.textContent = currentPage
        pagesSpan.textContent = Math.ceil(data.length / dataPerPage)

        const disablePrev = () => prevBtn.disabled = currentPage === 1
        const disableNext = () => nextBtn.disabled = currentPage === Math.ceil(data.length / dataPerPage)

        disablePrev()
        disableNext()

        prevBtn.addEventListener('click', function () {
                if (currentPage > 1) {
                        currentPage--;
                        renderData(data.slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage));
                }

                pageSpan.textContent = currentPage
                disablePrev()
                disableNext()
        })

        nextBtn.addEventListener('click', function () {
                if (currentPage < Math.ceil(data.length / dataPerPage)) {
                        currentPage++;
                        renderData(data.slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage));
                }
                pageSpan.textContent = currentPage
                disablePrev()
                disableNext()
        })

        searchInput.addEventListener('input', (e) => {
                const searchValue = e.target.value.toLowerCase();
                const filteredData = data.filter(item => filters.some(filter => String(item[filter]).toLowerCase().includes(searchValue)))
                renderData(filteredData.slice(0, dataPerPage))
        })
}

export default Pagination