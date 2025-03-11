const input = document.querySelector('.task-input');
const taskList = document.querySelector('.task-list');


input.addEventListener('keypress', (e) => {
 const newTask = input.value.trim();
  if (e.key === 'Enter') {
    e.preventDefault();
    if (newTask !== '') {
      const task = document.createElement('li');
      task.innerHTML = newTask;
      taskList.appendChild(task);
      task.className = 'item';
      input.value = ''
    }
  }
})