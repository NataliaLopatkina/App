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
        var toDoText = document.createElement("p");
        var buttonRemoveItem = document.createElement("button");
        var checkBox = document.createElement("input");

        toDoItem.appendChild(toDoText);

        checkBox.setAttribute("type", "checkbox");

        if (fieldEntryValue === "") {
            alert("Enter task")
        }

        else {
            toDoItems.push(fieldEntryValue);

            var i = 0;
            toDoItems.forEach(function () {
                i++;
                toDoItem.setAttribute("id", "row-" + i);
                toDoItem.appendChild(checkBox);
                toDoItem.appendChild(toDoText);
                toDoText.appendChild(toDoItemText);
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
                    var item = this.parentElement;
                    item.remove();
                })
            }
        }

        removeItems();
    }

    // var updateHandlers = function () {
    //     toDoList.addEventListener("click", function (event) {
    //         var target = event.target;

    //         if (target.tagName === "LI") {
    //             target.classList.toggle("complited");
    //         }

    //         var complitedItems = document.querySelectorAll(".complited");

    //         complitedItems.forEach(function (element) {
    //             element.setAttribute("data-filter", "complited");
    //         });

    //     }, false)
    // }

    // updateHandlers();

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

var rowsList = document.querySelectorAll("li");
var countRows = 5;

function Pagination() {
    var content = document.querySelector(".todo__content");
    var containerPagesControl = document.createElement("div");

    containerPagesControl.classList.add("paging-control");
    content.appendChild(containerPagesControl);

    var getPagesList = function (page) {
        page = page - 1;
        var beginArray = page * countRows;
        var endArray = beginArray + countRows;
        var newRowsList = rowsList.slice(beginArray, endArray);

        console.log(newRowsList);
    }

    getPagesList(1);
}

if (rowsList.length > countRows) {
    var pagination = new Pagination();
}

// Выводить массив с страницами, если количество элементов на странице превышает заданное количество элементов
// Вычислить количество страниц: поделить общее количество элементов на количество элементов на странице
// При добавлении или удалении элементов нужно проверять условие: 
// - Если общее количество страниц больше, добавлять элемент пагинации;
// - Если общее количество страниц меньше, удалить элемент пагинации.
