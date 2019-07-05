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
