console.log("I'm ToDo");

function App() {
    var toDoContent = document.querySelector(".todo__content");
    var toDoList = toDoContent.querySelector(".todo__list");
    var toDoItems = [];
    var toDoButton = toDoContent.querySelector(".todo__button");

    var drawItems = function () {
        toDoButton.addEventListener("click", function () {
            addItems();

            if (toDoItems.length > 0) {
                filterItems();
            }
        })
    }

    var addItems = function () {
        var fieldEntry = document.querySelector(".todo__input");
        var fieldEntryValue = fieldEntry.value;
        var toDoItemText = document.createTextNode(fieldEntryValue);
        var toDoItem = document.createElement("li");
        var buttonRemoveItem = document.createElement("button");

        if (fieldEntryValue === "") {
            alert("Enter task")
        }

        else {
            toDoItems.push(fieldEntryValue);

            toDoItems.forEach(function () {
                toDoItem.appendChild(toDoItemText);
                toDoList.insertBefore(toDoItem, toDoList.children[0]);
                toDoItem.setAttribute("data-filter", "uncomplited");
                toDoItem.appendChild(buttonRemoveItem);
            })
        }

        fieldEntry.value = "";

        var removeItems = function () {
            var buttonRemoveItem = toDoList.querySelectorAll("button");

            for (var i = 0; i < buttonRemoveItem.length; i++) {
                buttonRemoveItem[i].addEventListener("click", function () {
                    var item = this.parentElements;
                    item.remove();
                })
            }
        }

        removeItems();
    }

    var updateHandlers = function () {
        toDoList.addEventListener("click", function (event) {
            var target = event.target;

            if (target.tagName === "LI") {
                target.classList.toggle("complited");
            }

            var complitedItems = document.querySelectorAll(".complited");

            complitedItems.forEach(function (element) {
                element.setAttribute("data-filter", "complited");
            });

        }, false)
    }

    updateHandlers();

    drawItems();

    var filterContainer = document.createElement("div");
    var buttonComplited = document.createElement("button");
    var buttonUncomplited = document.createElement("button");
    var buttonAll = document.createElement("button");

    var addFilterButtons = function () {
        filterContainer.classList.add("filter");
        toDoContent.appendChild(filterContainer);

        buttonComplited.innerText = "Complited";
        buttonComplited.setAttribute("data-button", "complited");
        filterContainer.appendChild(buttonComplited);

        buttonUncomplited.innerText = "Uncomplited";
        buttonUncomplited.setAttribute("data-button", "uncomplited");
        filterContainer.appendChild(buttonUncomplited);

        buttonAll.innerText = "All";
        buttonAll.setAttribute("data-button", "all");
        filterContainer.appendChild(buttonAll);
    }
    
    addFilterButtons();

    var filterItems = function () {

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

    filterItems();
}

var app = new App();

// Pagination

var drawPagination = function () {
    var items = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
    var countItems = 5;
    var countPages = Math.ceil(items.length / countItems);

    function drawItems(index) {
        index = index - 1;
        beginArray = index * countItems;
        endArray = beginArray + countItems;
        newArray = items.slice(beginArray, endArray);

        console.log(newArray);
    }

    drawItems(1);
}

drawPagination();
