function App() {
    var formAdd = new FormAdd();
    var row = new Row();
    var pagination = new Pagination();
    var filter = new Filter();
}

var app = new App();

function FormAdd() {
    var createForm = function () {
        this.contentApp = document.querySelector(".todo");
        var formApp = document.createElement("form");
        var inputApp = document.createElement("input");
        this.buttonAdd = document.createElement("button");

        formApp.setAttribute("method", "");
        formApp.setAttribute("action", "");

        inputApp.setAttribute("type", "text");
        inputApp.setAttribute("placeholder", "Enter task");

        buttonAdd.innerText = "Add";

        contentApp.appendChild(formApp);

        formApp.appendChild(inputApp);
        formApp.appendChild(buttonAdd);
    }

    createForm();

    var addRow = function () {
        this.list = document.createElement("ol");
        var fieldEntry = this.contentApp.querySelector("input[type='text']");
        var fieldEntryValue = fieldEntry.value;
        this.rowText = document.createTextNode(fieldEntryValue);

        this.contentApp.appendChild(list);

        if (fieldEntryValue === "") {
            alert("Enter task");

        } else {
            rows.push(fieldEntryValue);
            console.log(rows);

            rows.forEach(function () {
                row.appendChild(rowText);
                list.insertBefore(row, list.children[0]);
            })
        }

        fieldEntry.value = "";
    }

    buttonAdd.addEventListener("click", function () {
        addRow();
    })
}

function Row() {
    var createRow = function (index, text, state) {
        this.row = document.createElement("li");
        // this.rowText = document.createTextNode(text);

        this.row.setAttribute("id", "row-" + index);

        if (state === "complited") {
            row.classList.add("complited");
        }

        return row;
    }

    createRow();
}

function Pagination () {
    countRows = 5;
    rows = [1, 2, 3, 4,5 ,6 ,7];

    var createPagination = function() {
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

    var getRowsPage = function(page) {
        var page = page - 1;
        var beginArrayRows = page*countRows;
        var endArrayRows = beginArrayRows + countRows;

        var newArrayRows = rows.slice(beginArrayRows, endArrayRows);

        console.log(newArrayRows);
    }

    getRowsPage(2);

    var calculateCountPages = function() {
        var rowsLength = rows.length;
        var countPages = Math.ceil(rowsLength/countRows);

        console.log(countPages);
    }

    calculateCountPages();
}

function Filter() {
    var createFilter = function() {
        var filterContent = document.createElement("div");
        var filterButtonList = document.createElement("ul");
        var filterButtonItem = document.createElement("li");

        contentApp.appendChild(filterContent);
        filterContent.appendChild(filterButtonList);
        filterButtonList.appendChild(filterButtonItem);
    }

    createFilter();
     
    var createButtonFilter = function() {
        var buttonFilter = document.createElement("button");
        buttonFilter.setAttribute("data-button", "");
        buttonFilter.innerText = "Button";
    }

    createButtonFilter();

    var filterRows = function() {
        var filterActive = "";

        if (filterActive != 0) {
            var rows = list.querySelector("li");

            console.log(rows);
        }

        var rows = list.querySelector("li");

        console.log(rows);
    }

    filterRows();
 }

