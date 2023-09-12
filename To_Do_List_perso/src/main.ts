  async function fetchTodo() {
    const response = await fetch(`http://localhost:3000/api/get/${taskText}`)
    const todo = await response.text();
    console.log(todo);
  }

  async function updateCompletedStatus(taskId: string, newStatus: boolean) {
    try {
      const response = await fetch(`http://localhost:3000/api/update/${taskId}/${newStatus}`, {
        method: 'PUT', // Utilisez la méthode HTTP PUT pour mettre à jour l'état
      });
  
      if (response.ok) {
        const contentType = response.headers.get('content-type');
  
        if (contentType && contentType.includes('application/json')) {
          const updatedTask = await response.json();
          const taskLabel = document.getElementById(`labelid-${taskId}`);
  
          if (updatedTask && taskLabel) {
            if (updatedTask.status === true) {
              taskLabel.classList.add('completed');
            } else {
              taskLabel.classList.remove('completed');
            }
          }
  
          console.log('Modification réussie.');
        } else {
          console.error('La réponse du serveur n\'est pas au format JSON.');
        }
      } else {
        console.error('Erreur lors de la modification.');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  }

  // Sélection des éléments CSS
  const taskInput  = document.querySelector('#task-input') as HTMLInputElement;
  const addButton = document.querySelector('#add-button') as HTMLButtonElement;
  const taskList = document.querySelector('.task-list') as HTMLUListElement; // Utilisation de querySelector au lieu de querySelectorAll

  // Ajout d'un "écouteur" au clic sur le bouton "Ajouter"
  let taskText = ""
  addButton.addEventListener('click', () => {
      taskText = taskInput.value;
      if (taskText !== '') {
          addTask(taskText);
          taskInput.value = '';
          fetchTodo() 
      }});

  // Fonction pour ajouter une tâche à la liste
  let index = 1;
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
        const dataIndexAttribute = checkbox.getAttribute('data-index');
        if (dataIndexAttribute !== null) {
          const taskId = dataIndexAttribute.toString();
          taskLabel.classList.toggle('completed');
          if (taskId) {
            const newStatus = checkbox.checked; // Obtenez le nouvel état de la case à cocher
            updateCompletedStatus(taskId, newStatus); // Appelez la fonction avec l'ID de la tâche et le nouvel état
          }
        }
      });
      
      

      taskItem.appendChild(checkbox);
      taskItem.appendChild(taskLabel);
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);


      index = index + 1;
  }


