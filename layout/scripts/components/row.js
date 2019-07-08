function Row() {}

Row.prototype.createRow = function (id, text, state) {
    var row = document.createElement('li');
    var rowText = document.createTextNode(text);
    var buttonRemove = document.createElement('button');

    row.setAttribute('id', id);
    row.setAttribute('data-filter', state);
    row.classList.add(state);

    row.appendChild(rowText);
    row.appendChild(buttonRemove);

    return row;
}
