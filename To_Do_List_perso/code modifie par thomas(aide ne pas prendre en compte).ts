// Sélection des éléments CSS
const taskInput = document.querySelector('#task-input') as HTMLInputElement;
const addButton = document.querySelector('#add-button') as HTMLButtonElement;
const taskList = document.querySelector('.task-list') as HTMLUListElement; 

// Ajout d'un "écouteur" au clic sur le bouton "Ajouter"
addButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

// Fonction pour ajouter une tâche à la liste
let index = 0;
function addTask(text: string) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('checklist-item');

    const checkbox = document.createElement('span');
    checkbox.classList.add('checkbox');
    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.setAttribute('data-index', index.toString()); // Utilisation de "data-index"
    checkboxInput.addEventListener('change', () => {
        const dataIndex = taskItem.getAttribute('data-index');
        const taskLabel = document.querySelector(`#labelid-${dataIndex}`)
        taskLabel?.classList.toggle('completed');
    });
    checkbox.appendChild(checkboxInput);

    const taskLabel = document.createElement('span');
    taskLabel.classList.add('task');
    taskLabel.textContent = text;
    taskLabel.setAttribute('id', `labelid-${index}`); // Utilisation de l'ID unique

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'delete';

    // Écouteur pour le bouton de suppression
    deleteButton.addEventListener('click', () => {
        taskItem.remove()
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    index = index + 1;
}

