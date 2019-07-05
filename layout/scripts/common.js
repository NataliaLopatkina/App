console.log("I'm ToDo");

function App(content) {
    this.list = [];
    this.content = document.querySelector(content);
    this.row = new Row();
    this.pagination = new Pagination();
    this.init();
    this.render();
}

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

App.prototype.render = function () {
    var page = this.pagination.getPage(this.list, "uncompleted");
    this.drowRowList(page);
    this.pagination.drowControls(this.list, this.paginationContainer);
    this.addEventListeners();
}

App.prototype.init = function () {
    this.addComponents();
    this.createForm();
    this.checkStorage();
    this.createButtonFilter();
    // /this.filterRows();
}

App.prototype.addComponents = function () {
    this.content = document.querySelector(".todo");
    this.form = document.createElement("form");
    this.listRows = document.createElement("ol");
    this.filter = document.createElement("div");
    this.paginationContainer = document.createElement("ul");

    this.filter.classList.add("filter");
    this.paginationContainer.classList.add("pagination");
    this.listRows.classList.add("list-rows");


    this.content.appendChild(this.filter);
    this.content.appendChild(this.form);
    this.content.appendChild(this.listRows);
    this.content.appendChild(this.paginationContainer);

}

App.prototype.createForm = function () {
    this.fieldEntry = document.createElement("input");
    this.buttonAdd = document.createElement("button");

    this.form.appendChild(this.fieldEntry);
    this.form.appendChild(this.buttonAdd);

    this.form.setAttribute("method", "post");
    this.form.setAttribute("action", "#5");
    this.form.setAttribute("onsubmit", "return false");

    this.fieldEntry.setAttribute("type", "text");
    this.fieldEntry.setAttribute("placeholder", "Enter task");

    this.buttonAdd.innerText = "Add";
    this.buttonAdd.setAttribute("type", "button");
}

App.prototype.checkStorage = function () {
    // IF need to put data in localstorage
    // var data = [{ text: "task1", state: "completed" }, { text: "task2", state: "completed" }, { text: "task3", state: "completed" }];
    // localStorage.setItem("todo-list", JSON.stringify(data));
    var list = localStorage.getItem("todo-list");
    if (list !== undefined) {
        this.list = JSON.parse(list);
    }
}

App.prototype.drowRowList = function (page) {

    Array.from(this.listRows.children).forEach(function (item) {
        item.remove();
    });

    page.forEach(function (item, index) {
        var newRow = this.row.createRow(index, item.text, item.state);
        this.listRows.insertBefore(newRow, this.listRows.children[0]);
    }, this)
}

App.prototype.addEventListeners = function () {
    var app = this;

    this.buttonAdd.addEventListener("click", function () {
        app.addElement();
    })

    this.fieldEntry.addEventListener("keydown", function (event) { // Добавление row при нажатии на enter
        if (event.keyCode === 13) {
            app.addElement();
        }
    });

    this.listRows.addEventListener("click", function (event) {

        if (event.target.tagName === "LI") {
            app.row.toggleState(event.target);
        }
    })

    var buttonsRemoveList = this.listRows.querySelectorAll("button");

    for (let i = 0; i < buttonsRemoveList.length; i++) {

        buttonsRemoveList[i].addEventListener("click", function () {
            var item = this.parentElement;
            item.remove();
            var index = app.list.length - i;
            app.list = app.list.splice(index, 1);
        })
    }

    var paginationButtons = this.paginationContainer.children;

    for (let i = 0; i < paginationButtons.length; i++) {

        paginationButtons[i].addEventListener("click", function () {

            if (app.pagination.currentPage !== i + 1) {
                app.pagination.setPage(i + 1);
                app.render();
            }
        })
    }
}

App.prototype.addElement = function () {
    var text = this.fieldEntry.value;

    if (text == "") {
        alert("Enter something!")

    } else {
        this.list.push({ index: this.list.length, text: text, state: "uncompleted" });
        localStorage.setItem("todo-list", JSON.stringify(this.list));
        var newRow = this.row.createRow(this.list.length - 1, text, "uncompleted");
        this.listRows.insertBefore(newRow, this.listRows.children[0]);
    }

    this.fieldEntry.value = "";
}

App.prototype.createButtonFilter = function (textButton, data) {
    // var buttonFilter = document.createElement("button");
    // buttonFilter.innerText(textButton);
    // buttonFilter.setAttribute("type", "button");
    // buttonFilter.setAttribute("data-button", data);

    var buttonComplited = document.createElement("button");
    var buttonUncomplited = document.createElement("button");
    var buttonAll = document.createElement("button");

    buttonComplited.innerText = "Complited";
    buttonComplited.setAttribute("data-button", "completed");
    this.filter.appendChild(buttonComplited);

    buttonUncomplited.innerText = "Uncomplited";
    buttonUncomplited.setAttribute("data-button", "uncompleted");
    this.filter.appendChild(buttonUncomplited);

    buttonAll.innerText = "All";
    buttonAll.setAttribute("data-button", "all");
    this.filter.appendChild(buttonAll);
}

App.prototype.filterRows = function () {
    var filterActive = "";
    var app = this;

    this.itemsList = app.listRows.querySelectorAll("li");
    this.itemsList.forEach(function (item) {
        item.classList.remove("not-active");
    });

    function filterItemsList(category) {
        if (filterActive != category) {

            this.itemsList = app.listRows.querySelectorAll("li");

            this.itemsList.forEach(function (item) {
                item.classList.add("not-active");
            });

            var activeItemsList = app.listRows.querySelectorAll("[data-filter =" + category + "]");

            activeItemsList.forEach(function (item) {
                item.classList.remove("not-active");
            });

            filterActive = category;
        }
    }

    var filterButtons = this.filterContainer.querySelectorAll("button");

    filterButtons.forEach(function (element) {
        element.addEventListener("click", function () {
            var currentTarget = event.target.dataset.button;

            filterButtons.forEach(function (item) {
                item.classList.remove("is-active");
            })

            event.target.classList.add("is-active");

            filterItemsList(currentTarget);
        })
    })

    var filterButtonAll = document.querySelector('[data-button="all"]');

    filterButtonAll.addEventListener("click", function (list) {
        this.itemsList.forEach(function (element) {
            element.classList.remove("not-active");
        })

        filterActive = "all";
    })

    filterItemsList();
}

var app = new App("todo");

function Row() {

    this.createRow = function (index, text, state) {
        var row = document.createElement("li");
        var rowText = document.createTextNode(text);
        var buttonRemove = document.createElement("button");

        row.setAttribute("id", "row-" + (index + 1));
        row.setAttribute("data-filter", state);

        row.appendChild(rowText);
        row.appendChild(buttonRemove);

        return row;
    }

    this.toggleState = function (target) {
        target.classList.toggle("completed");

        var complitedRows = document.querySelectorAll(".completed");

        complitedRows.forEach(function (element) {
            element.setAttribute("data-filter", "completed");
        });
    }
}
