function Pagination() {
    this.currentPage = 1;
    this.pageSize = 5;
    this.countPages = 0;
}

Pagination.prototype.drowControls = function (list, container) {
    var countPages = Math.ceil(list.length / this.pageSize);

    if (countPages === this.countPages) {
        return;
    }

    this.countPages = countPages;

    for (var i = 0; i < countPages; i++) {
        var itemPage = document.createElement("li");
        var linkPage = document.createElement("a");
        var linkText = document.createTextNode(i + 1);

        container.appendChild(itemPage);
        itemPage.appendChild(linkPage);
        linkPage.appendChild(linkText);
    }
}

Pagination.prototype.setPage = function (page) {
    this.currentPage = page;
}

Pagination.prototype.getPage = function (list, filter) {
    var beginArrayRows = (this.currentPage - 1) * this.pageSize;
    var endArrayRows = beginArrayRows + this.pageSize;
    var filteredList = list.filter(function (item) {
        return item.state === filter
    })

    return filteredList.slice(beginArrayRows, endArrayRows);
}
