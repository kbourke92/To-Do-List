document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todosContainer = document.querySelector('.todos-container');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');


    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    }

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) {
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            if (checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;

                li.querySelector('.delete-btn').addEventListener('click', () => {
                    li.remove();
                    toggleEmptyState();
                });

                li.textContent = taskText;
                taskList.appendChild(li);
                taskInput.value = '';
                toggleEmptyState();

            };

        });

    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(e);
        }

    });
});
