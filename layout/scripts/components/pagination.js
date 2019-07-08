function Pagination() {
    this.currentPage = 1;
    this.pageSize = 5;
    this.countPages = 0;
}

Pagination.prototype.setPage = function (page) {
    this.currentPage = page;
}

Pagination.prototype.createControl = function (pageNumber) {
    var controlItem = document.createElement('li');
    var controlLink = document.createElement('a');
    var controlText = document.createTextNode(pageNumber);

    controlLink.setAttribute('data-page', pageNumber);
    controlItem.appendChild(controlLink);
    controlLink.appendChild(controlText);

    return controlItem;
}

Pagination.prototype.getPage = function (list) {
    var beginArrayRows = (this.currentPage - 1) * this.pageSize;
    var endArrayRows = beginArrayRows + this.pageSize;

    return list.slice(beginArrayRows, endArrayRows);
}

Pagination.prototype.drowControls = function (list, container) {
    var elements = container.querySelectorAll('li');
    elements.forEach(function (item) {
        item.parentNode.removeChild(item);
    })

    this.countPages = Math.ceil(list.length / this.pageSize);
    
    for (var i = 0; i < this.countPages; i++) {
        var newControl = this.createControl(i + 1)
        container.appendChild(newControl);
    }
}
