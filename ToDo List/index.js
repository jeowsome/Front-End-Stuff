const addTask = document.getElementById('add-task-button');
const taskInput = document.getElementById('input-task');
const taskListElements = document.getElementById('task-list');
lineCheck();

let taskList = JSON.parse(localStorage.getItem("tasks")) || []

if (localStorage.tasks && taskList.length) {
    taskListElements.innerHTML += taskList.join('')
    addButtonListen();
    lineCheck();
}

function lineCheck() {
    let checkbox = document.querySelectorAll('.check');
    checkbox.forEach(function(check) {
        check.addEventListener('click', function () {
            if(this.checked) {
                let tempLi =  this.parentElement.querySelectorAll(".task");
                tempLi.forEach(function (span) {
                    span.style.textDecoration = "line-through";
                });
            } else {
                let tempLi =  this.parentElement.querySelectorAll(".task");
                tempLi.forEach(function (span) {
                    span.style.textDecoration = "none";
                });
            }
        });
    });
}

function newLi(task) {
    return `<li>
            <input type="checkbox" class="check">
            <span class="task">${task}</span>
            <button class="delete-btn">X</button>
            </li>`.trim();
}

function updateList() {
    const updatedList = []
    document.querySelectorAll('#task-list>li').forEach(e => updatedList.push(e.outerHTML))
    console.log(updatedList)
    localStorage.clear()
    localStorage.setItem('tasks', JSON.stringify(updatedList))
}

function addButtonListen(){
    let deleteBut = document.querySelectorAll(".delete-btn");
    deleteBut.forEach(function (btn) {
        btn.addEventListener('click', function () {
            btn.parentElement.remove();
            updateList()
        })
    })
}


addTask.onclick = (ev => {
    if (taskInput.value === '') {
        return;
    }
    taskList.push(newLi(taskInput.value))
    taskListElements.insertAdjacentHTML('beforeend', newLi(taskInput.value));
    taskInput.value = '';
    addButtonListen();
    lineCheck();
    localStorage.setItem('tasks', JSON.stringify(taskList))
});
