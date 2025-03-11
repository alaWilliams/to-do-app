const input = document.querySelector('.task-input');
const taskList = document.querySelector('.task-list');

const BACKEND_ROOT_URL = 'http://localhost:3001';

input.disabled = true;


const renderTask = (task) => {
  const element = document.createElement('li');
  element.innerHTML = task;
  taskList.appendChild(element);
  element.className = 'item';
}

const getTasks = async () => {
  try {
    const response = await fetch(BACKEND_ROOT_URL);
    const json = await response.json();
    json.forEach(task => {
      renderTask(task.description)
    })
    input.disabled = false;
  } catch (error) {
    alert (`Error retrieving tasks ${error.message}`)
  }
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
input.addEventListener('keypress', (e) => {
 const newTask = input.value.trim();
  if (e.key === 'Enter') {
    e.preventDefault();
    if (newTask !== '') {
      saveTask(newTask).then((json) => {
        renderTask(newTask);
        input.value = ''
      })
      
    }
  }
})