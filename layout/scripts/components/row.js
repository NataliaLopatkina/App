function Row() {
    var createRow = function (index, text, state) {
        this.row = document.createElement("li");
        this.rowText = document.createTextNode(text);

        this.row.setAttribute("id", "row-" + index);

        if (state === "complited") {
            row.classList.add("complited");
        }

        return row;
    }

    createRow();
}

function Pagination(contentApp) {
    countRows = 5;
    rows = [1, 2, 3, 4, 5, 6, 7];

    this.currentPage = 1;

    this.row = new Row();

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

    this.drowPage = function () {
        var items = this.getRowsPage(this.currentPage);
        
        items.forEach(item, index => {
            var newRow = row.createRow(index, item.text, item.state);
            content.appendChild(newRow);
        });
    }

    this.getRowsPage = function () {
        var beginArrayRows = this.currentPage * countRows;
        var endArrayRows = beginArrayRows + countRows;

        var newArrayRows = list.slice(beginArrayRows, endArrayRows);
        console.log(newArrayRows);
        return newArrayRows;

    }

    //getRowsPage(2);

    var calculateCountPages = function () {
        var rowsLength = rows.length;
        var countPages = Math.ceil(rowsLength / countRows);

        console.log(countPages);
    }

   // calculateCountPages();
}


function App() {
    

    this.content = document.querySelector('ol');
    this.contentApp = document.querySelector('.todo');
    this.pagination = new Pagination(this.contentApp);

    this.list = [{text:'test1', state:'completed'}, {text:'test2', state:'completed'}];

    // this.drowList = function () {
    //     list.forEach((item, index) => {
    //         var newRow = row.createRow(index, item.text, item.status);
    //         this.content.appendChild(newRow);
    //     })
    // }

    this.addEventListner = function () {
        //добавить обработчик для кнопки добавления row;
        //добавать обработчики для кнопок пагинации 
        //добавить обработчики для кнопок удаления row
    }

    this.getListFromLocalStorage = function () {
        this.list = JSON.parse(localStorage.getItem('list'));
    }

    var start = function() {
        this.getListFromLocalStorage();
        this.drowPage();
        this.addEventListner();
    }

    start();
}

var app = new App();
