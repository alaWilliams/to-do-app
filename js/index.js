const input = document.querySelector('.task-input');
const taskList = document.querySelector('.task-list');

const BACKEND_ROOT_URL = 'https://to-do-app-server-rsyf.onrender.com';
import { Todos } from "./class/Todos.js";

const todos = new Todos(BACKEND_ROOT_URL)

input.disabled = true;

const renderTask = (task) => {
  const li = document.createElement('li');
  li.className = 'list-item';
  li.setAttribute('data-key', task.getId().toString());
  renderSpan(li,task.getText());
  renderLink(li,task.getId());
  taskList.append(li);
}

const renderSpan = (li, text) => {
  const span = li.appendChild(document.createElement('span'));
  span.innerHTML = text;
}

const renderLink = (li, id) => {
  const a = li.appendChild(document.createElement('a'));
  a.innerHTML = '<i class="bi bi-trash"></i>';
  a.style = 'float: right';
  a.addEventListener('click', (event) => {
    todos.removeTask(id).then((removed_id)=> {
      const li_to_remove = document.querySelector(`[data-key='${removed_id}']`);
      if (li_to_remove) {
        taskList.removeChild(li_to_remove)
      }
    }).catch((error) => {
      alert(error)
    })
  })
}

const getTasks = () => {
  todos.getTasks().then((tasks) => {
    tasks.forEach(task => {
      renderTask(task)
    })
    input.disabled = false;
  }).catch((error) => {
    alert(error)
  })
}

const saveTask = async (task) => {
  try {
    const json = JSON.stringify({description: task});
    const response = await fetch (BACKEND_ROOT_URL + '/new', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    })
    return response.json()
  } catch (error) {
    alert (`Error saving task ${error.message}`)
  }
  } 


getTasks();
input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const task = input.value.trim();
    if (task !== '') {
      todos.addTask(task).then((task) => {
        renderTask(task);
        input.value = '';
        input.focus();
      })
    }
  }
})