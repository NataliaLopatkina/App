function App(content) {
    this.list = [];
    this.content = document.querySelector(content);
    this.row = new Row();
    this.pagination = new Pagination();
    this.filter = new Filter();
    this.init();
    this.render();
    this.addEventListeners();
}

App.prototype.render = function () {
    var filteredList = this.filter.filterList(this.list);
    var page = this.pagination.getPage(filteredList);
    this.drawRowList(page);
    this.pagination.drowControls(filteredList, this.paginationContainer);
    this.updateEventListners();
}

App.prototype.init = function () {
    this.addContainers();
    this.createForm();
    this.filter.create(this.filterContainer);
    this.checkStorage();
}

App.prototype.updateEventListners = function () {
    var app = this;

    for (var i = 0; i < this.listRows.children.length; i++) {
        this.listRows.children[i].addEventListener('click', function (event) {
            if (event.target.tagName === 'LI') {
                app.list.forEach(function (item) {
                    if (item.id === event.target.id) {
                        switch (item.state) {
                            case 'completed':
                                item.state = 'uncompleted';
                                break;
                            case 'uncompleted':
                                item.state = 'completed';
                                break;
                            default:
                                break;
                        }
                    }
                })
                localStorage.setItem('todo-list', JSON.stringify(app.list));
                app.render();
            }
        })
    }

    var buttonsRemoveList = this.listRows.querySelectorAll('button');

    for (var i = 0; i < buttonsRemoveList.length; i++) {

        buttonsRemoveList[i].addEventListener('click', function () {
            var item = this.parentElement;
            app.list = app.list.filter(function (listItem) {
                return item.id !== listItem.id
            })
            localStorage.setItem('todo-list', JSON.stringify(app.list));
            item.remove();
            app.render();
        })
    }

    var paginationButtons = this.paginationContainer.children;

    for (var i = 0; i < paginationButtons.length; i++) {

        paginationButtons[i].addEventListener('click', function (event) {
            var page = event.target.dataset.page;

            if (app.pagination.currentPage !== page) {
                app.pagination.setPage(page);
                app.render();
            }
        })
    }
}

App.prototype.addEventListeners = function () {
    var app = this;

    var filterButtons = this.filterContainer.querySelectorAll('button');

    filterButtons.forEach(function (element) {
        element.addEventListener('click', function () {
            var currentTarget = event.target.dataset.button;
            app.filter.setState(currentTarget);

            filterButtons.forEach(function (item) {
                item.classList.remove('is-active');
            });

            event.target.classList.add('is-active');
            app.render();
        });
    });

    this.buttonAdd.addEventListener('click', function () {
        app.addNewRow();
        app.render();
    })

    this.fieldEntry.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            app.addNewRow();
            app.render();
        }
    });
}

App.prototype.addContainers = function () {
    this.content = document.querySelector('.todo');
    this.form = document.createElement('form');
    this.listRows = document.createElement('ol');
    this.filterContainer = document.createElement('div');
    this.paginationContainer = document.createElement('ul');

    this.filterContainer.classList.add('filter');
    this.filterContainer.classList.add('todo--filter');
    this.listRows.classList.add('list-rows');
    this.paginationContainer.classList.add('pagination');

    this.content.appendChild(this.filterContainer);
    this.content.appendChild(this.form);
    this.content.appendChild(this.listRows);
    this.content.appendChild(this.paginationContainer);
}

App.prototype.createForm = function () {
    this.fieldEntry = document.createElement('input');
    this.buttonAdd = document.createElement('button');

    this.form.appendChild(this.fieldEntry);
    this.form.appendChild(this.buttonAdd);

    this.form.setAttribute('method', 'post');
    this.form.setAttribute('action', '#5');
    this.form.setAttribute('onsubmit', 'return false');

    this.fieldEntry.setAttribute('type', 'text');
    this.fieldEntry.setAttribute('placeholder', 'Enter something');

    this.buttonAdd.innerText = 'Add';
    this.buttonAdd.setAttribute('type', 'button');
}

App.prototype.checkStorage = function () {
    var list = localStorage.getItem('todo-list');
    if (list !== undefined) {
        this.list = JSON.parse(list);
    }
}

App.prototype.drawRowList = function (page) {

    var listForRemove = this.listRows.querySelectorAll('li');

    listForRemove.forEach(function (item) {
        item.remove();
    })

    page.reverse().forEach(function (item) {
        var newRow = this.row.createRow(item.id, item.text, item.state);
        this.listRows.insertBefore(newRow, this.listRows.children[0]);
    }, this)
}

App.prototype.addNewRow = function () {
    var text = this.fieldEntry.value;

    if (text == '') {
        alert('Enter something!')

    } else {
        this.list.unshift({ id: 'row-' + this.list.length, text: text, state: 'uncompleted'});
        localStorage.setItem('todo-list', JSON.stringify(this.list));
    }

    this.fieldEntry.value = '';
}

var app = new App('todo');
