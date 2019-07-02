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
