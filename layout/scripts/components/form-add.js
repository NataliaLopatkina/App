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
        var list = document.createElement("ol");
        var fieldEntry = this.contentApp.querySelector("input[type='text']");
        var fieldEntryValue = fieldEntry.value;

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
    }

    buttonAdd.addEventListener("click", function () {
        addRow();
    })
}
