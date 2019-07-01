function App() {

}

var app = new App();

function Row() {
    var createRow = function(index, text, state) {
        var row = document.createElement("li");
        var rowText = document.createTextNode(text);

        row.setAttribute("id", "row-" + index);

        if (state === "complited") {
            row.classList.add("complited");
        }

        return row();
    }

    createRow();
}

function Pagination() {
    this.currentPage = currentPage;
    this.countRow = countRow;

    var getRowPage = function(numPage, listRow) {
        var beginArray = numPage*this.countRow;
        var endArray = numPage*this.countRow + countRow;

        var newListRow = listRow.slice(beginArray, endArray);

        return newListRow;
    }

    getRowPage();
}

function Filter() {
    var createButton = function(text, dataButton) {
        var filterButton = document.createElement("button");
        filterButton.innerText(text);
        filterButton.setAttribute("data-button", dataButton)
    }

    createButton();

    var filterRows = function() {
        var filterActive = "";

        function filterToDoItems(category) {
            if (filterActive != category) {
                var toDoItems = toDoList.querySelectorAll("li");

                toDoItems.forEach(function (item) {
                    item.classList.add("not-active");
                });

                var activeToDoItems = toDoList.querySelectorAll(`[data-filter="${category}"]`);

                activeToDoItems.forEach(function (item) {
                    item.classList.remove("not-active");
                });

                filterActive = category;
            }
        }

        var filterButtons = filterContainer.querySelectorAll("button");

        filterButtons.forEach(function (element) {
            element.addEventListener("click", function () {
                var currentTarget = event.target.dataset.button;

                filterButtons.forEach(function (item) {
                    item.classList.remove("is-active");
                    event.target.classList.add("is-active");
                })

                filterToDoItems(currentTarget);
            })
        })

        var filterButtonAll = document.querySelector('[data-button="all"]');
        var toDoItems = toDoList.querySelectorAll("li");

        filterButtonAll.addEventListener("click", function () {
            toDoItems.forEach(function (element) {
                element.classList.remove("not-active");
            })

            filterActive = "all";
        })
    }

    filterRows();
}
