const input = document.querySelector('.task-input');
const taskList = document.querySelector('.task-list');

const BACKEND_ROOT_URL = 'http://localhost:3001';
import { Todos } from "./class/Todos.js";

const todos = new Todos(BACKEND_ROOT_URL)

input.disabled = true;

const renderTask = (task) => {
  const li = document.createElement('li');
  li.className = 'list-item';
  li.innerHTML = task.getText();
  taskList.appendChild(li);
  
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