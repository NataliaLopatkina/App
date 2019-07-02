function Pagination() {
    countRows = 5;
    rows = [1, 2, 3, 4, 5, 6, 7];

    var createPagination = function () {
        var pagination = document.createElement("div");
        var paginationList = document.createElement("ul");
        var paginationItem = document.createElement("li");
        var paginationLink = document.createElement("a");

        contentApp.appendChild(pagination);

        pagination.classList.add("pagination");
        pagination.appendChild(paginationList);

        paginationList.classList.add("pagination__list");
        paginationList.appendChild(paginationItem);

        paginationItem.appendChild(paginationLink);

        paginationLink.setAttribute("href", "#5");
    }

    createPagination();

    var getRowsPage = function (page) {
        var page = page - 1;
        var beginArrayRows = page * countRows;
        var endArrayRows = beginArrayRows + countRows;

        var newArrayRows = rows.slice(beginArrayRows, endArrayRows);

        console.log(newArrayRows);
    }

    getRowsPage(2);

    var calculateCountPages = function () {
        var rowsLength = rows.length;
        var countPages = Math.ceil(rowsLength / countRows);

        console.log(countPages);
    }

    calculateCountPages();
}
