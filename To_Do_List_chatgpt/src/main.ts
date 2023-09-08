// Sélection des éléments CSS
const taskInput = document.querySelector('#task-input') as HTMLInputElement;
const addButton = document.querySelector('#add-button') as HTMLButtonElement;
const taskList = document.querySelector('.task-list') as HTMLUListElement;

// Charger les tâches à partir du localStorage lors du chargement de la page
window.addEventListener('load', () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach((taskText: string) => addTask(taskText));
        updateCompletedTasks();
    }
});

// Ajout d'un "écouteur" au clic sur le bouton "Ajouter"
addButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

// Ajout d'un "écouteur" pour appuyer sur la touche "Enter"
document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const taskText = taskInput.value;
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    }
});

let index = 0;
function addTask(text: string) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('checklist-item');

    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-index', index.toString());

    const taskLabel = document.createElement('span');
    taskLabel.classList.add('task');
    taskLabel.textContent = text;
    taskLabel.setAttribute('id', `labelid-${index}`);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'delete';
    
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        updateLocalStorage();
    });

    checkbox.addEventListener('change', () => {
        taskLabel.classList.toggle('completed');
        updateLocalStorage();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    updateLocalStorage();
    index++;
}

const selectAllCheckbox = document.createElement('input');
selectAllCheckbox.classList.add('checkbox');
selectAllCheckbox.setAttribute('type', 'checkbox');
selectAllCheckbox.setAttribute('id', 'select-all-checkbox');

const selectAllLabel = document.createElement('label');
selectAllLabel.setAttribute('for', 'select-all-checkbox');
const selectAllText = document.createTextNode('Select All');
selectAllLabel.appendChild(selectAllText);

selectAllCheckbox.addEventListener('change', () => {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        const checkboxInput = checkbox as HTMLInputElement;
        checkboxInput.checked = selectAllCheckbox.checked;
        const index = checkbox.getAttribute('data-index');
        const taskLabel = document.querySelector(`#labelid-${index}`);
        if (taskLabel) {
            taskLabel.classList.toggle('completed', checkboxInput.checked);
            updateLocalStorage();
        }
    });
});

const deleteAllButton = document.createElement('button');
deleteAllButton.classList.add('delete-button');
deleteAllButton.textContent = 'supprimer cases cochées';

deleteAllButton.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        const checkboxInput = checkbox as HTMLInputElement;
        if (checkboxInput.checked) {
            const index = checkbox.getAttribute('data-index');
            const taskLabel = document.querySelector(`#labelid-${index}`);
            if (taskLabel) {
                const taskItem = taskLabel.closest('.checklist-item');
                if (taskItem) {
                    taskItem.remove();
                    selectAllCheckbox.checked = false;
                    updateLocalStorage();
                }
            }
        }
    });
});

// Fonction pour mettre à jour les tâches cochées
function updateCompletedTasks() {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        const checkboxInput = checkbox as HTMLInputElement;
        const index = checkbox.getAttribute('data-index');
        const taskLabel = document.querySelector(`#labelid-${index}`);
        if (taskLabel) {
            taskLabel.classList.toggle('completed', checkboxInput.checked);
            updateLocalStorage();
        }
    });
}

// Ajout des éléments à la liste des tâches
taskList.appendChild(selectAllCheckbox);
taskList.appendChild(selectAllLabel);
taskList.appendChild(deleteAllButton);

// Fonction pour mettre à jour le localStorage
function updateLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll('.task')).map(task => task.textContent);
    const status = (Array.from(taskList.querySelectorAll('.checkbox'))  as HTMLInputElement[]).map(checkbox => checkbox.checked);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('status', JSON.stringify(status));

}
/*
const taskInput = document.querySelector('#task-input') as HTMLInputElement;
const addButton = document.querySelector('#add-button') as HTMLButtonElement;
const taskList = document.querySelector('.task-list') as HTMLUListElement;

window.addEventListener('load', () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach((taskData: any) => addTask(taskData.text, taskData.completed));
        updateCompletedTasks();
    }
});

addButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText !== '') {
        addTask(taskText, false);
        taskInput.value = '';
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const taskText = taskInput.value;
        if (taskText !== '') {
            addTask(taskText, false);
            taskInput.value = '';
        }
    }
});

let index = 0;
function addTask(text: string, completed: boolean) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('checklist-item');

    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-index', index.toString());
    checkbox.checked = completed;

    const taskLabel = document.createElement('span');
    taskLabel.classList.add('task');
    taskLabel.textContent = text;
    taskLabel.setAttribute('id', `labelid-${index}`);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'delete';
    
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        updateLocalStorage();
    });

    checkbox.addEventListener('change', () => {
        taskLabel.classList.toggle('completed');
        updateLocalStorage();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    updateLocalStorage();
    index++;
}

const selectAllCheckbox = document.createElement('input');
selectAllCheckbox.classList.add('checkbox');
selectAllCheckbox.setAttribute('type', 'checkbox');
selectAllCheckbox.setAttribute('id', 'select-all-checkbox');

const selectAllLabel = document.createElement('label');
selectAllLabel.setAttribute('for', 'select-all-checkbox');
const selectAllText = document.createTextNode('Select All');
selectAllLabel.appendChild(selectAllText);

taskList.insertBefore(selectAllLabel, taskList.firstChild);
taskList.insertBefore(selectAllCheckbox, selectAllLabel.nextSibling);

selectAllCheckbox.addEventListener('change', () => {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        const checkboxInput = checkbox as HTMLInputElement;
        checkboxInput.checked = selectAllCheckbox.checked;
        const index = checkbox.getAttribute('data-index');
        const taskLabel = document.querySelector(`#labelid-${index}`);
        if (taskLabel) {
            taskLabel.classList.toggle('completed', checkboxInput.checked);
            updateLocalStorage();
        }
    });
});

const deleteAllButton = document.createElement('button');
deleteAllButton.classList.add('delete-button');
deleteAllButton.textContent = 'supprimer cases cochées';

deleteAllButton.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        const checkboxInput = checkbox as HTMLInputElement;
        if (checkboxInput.checked) {
            const index = checkbox.getAttribute('data-index');
            const taskLabel = document.querySelector(`#labelid-${index}`);
            if (taskLabel) {
                const taskItem = taskLabel.closest('.checklist-item');
                if (taskItem) {
                    taskItem.remove();
                    selectAllCheckbox.checked = false;
                    updateLocalStorage();
                }
            }
        }
    });
});

taskList.appendChild(deleteAllButton);

function updateCompletedTasks() {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        const checkboxInput = checkbox as HTMLInputElement;
        const index = checkbox.getAttribute('data-index');
        const taskLabel = document.querySelector(`#labelid-${index}`);
        if (taskLabel) {
            taskLabel.classList.toggle('completed', checkboxInput.checked);
        }
    });
}

function updateLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll('.task')).map(task => {
        const completed = task.classList.contains('completed');
        return { text: task.textContent, completed: completed };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
*/