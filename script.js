document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from  if available
    const loadTasks = () => {
        const tasks = JSON.parse(.getItem('tasks') || '[]');
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };

    // Add task to DOM
    const addTaskToDOM = (taskText, completed = false) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <div class="task-actions">
                <button class="complete-btn">${completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        if (completed) {
            li.classList.add('completed');
        }

        // Event listeners for buttons
        const completeBtn = li.querySelector('.complete-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        completeBtn.addEventListener('click', () => {
            li.classList.toggle('completed');
            completeBtn.textContent = li.classList.contains('completed') ? 'Undo' : 'Complete';
            saveTasks();
        });

        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        taskList.appendChild(li);
    };

    // Save tasks to 
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        .setItem('tasks', JSON.stringify(tasks));
    };

    // Add task button event listener
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText);
            taskInput.value = '';
            taskInput.focus();
            saveTasks();
        }
    });

    // Allow adding task by pressing Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Initial load of tasks
    loadTasks();
});
