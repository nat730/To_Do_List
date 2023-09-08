  async function fetchTodo() {
    const response = await fetch(`http://localhost:3000/api/${taskText}`)
    const todo = await response.text();
    console.log(todo);
  }

  // Sélection des éléments CSS
  const taskInput = document.querySelector('#task-input') as HTMLInputElement;
  const addButton = document.querySelector('#add-button') as HTMLButtonElement;
  const taskList = document.querySelector('.task-list') as HTMLUListElement; // Utilisation de querySelector au lieu de querySelectorAll

  // Ajout d'un "écouteur" au clic sur le bouton "Ajouter"
  let taskText = ""
  addButton.addEventListener('click', () => {
      taskText = taskInput.value;
      if (taskText !== '') {
          fetchTodo() 
          addTask(taskText);
          taskInput.value = '';
      }});

  // Fonction pour ajouter une tâche à la liste
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

      // Écouteur pour le bouton de suppression
      deleteButton.addEventListener('click', () => {
          taskItem.remove()
      });

      // Ajout d'un "écouteur" pour "cocher" la case
      checkbox.addEventListener('change', () => {
          taskLabel.classList.toggle('completed');
      });

      taskItem.appendChild(checkbox);
      taskItem.appendChild(taskLabel);
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);


      index = index + 1;
  }

