function Filter() {
    this.state = 'uncompleted';
    this.render;
}

Filter.prototype.createButton = function (text, data) {
    var button = document.createElement('button');
    button.innerText = text;
    button.setAttribute('type', 'button');
    button.setAttribute('data-button', data);
    return button;
}

Filter.prototype.setState = function (newState) {
    this.state = newState;
}

Filter.prototype.create = function (content) {
    var unCompleteButton = this.createButton('Uncompleted', 'uncompleted');
    unCompleteButton.classList.add('is-active');
    content.appendChild(unCompleteButton);
    var completeButton = this.createButton('Completed', 'completed');
    content.appendChild(completeButton);
    var all = this.createButton('All', 'all');
    content.appendChild(all);
}

Filter.prototype.filterList = function (list) {
    return list.filter(function (item) {
        return this.state === 'all' || item.state === this.state;
    }, this);
}
