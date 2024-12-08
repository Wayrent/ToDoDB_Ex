const taskForm = document.getElementById('taskForm'); 
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

const API_URL = 'http://localhost:3000/tasks';

// Загрузка задач
async function loadTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    taskList.innerHTML = '';  // Очищаем список перед добавлением новых
    tasks.forEach(addTaskToDOM); // Добавляем задачи в DOM
}

// Добавление задачи в DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = `task ${task.completed ? 'completed' : ''}`;  // Применяем класс "completed", если задача завершена
    li.innerHTML = `
        <span>${task.title}</span>
        <div>
            <button class="complete" onclick="toggleTask(${task.id}, ${!task.completed})">
                <i class="fas fa-check"></i> ${task.completed ? '' : ''}
            </button>
            <button class="delete" onclick="deleteTask(${task.id})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    taskList.appendChild(li);  // Добавляем задачу в список
}

// Добавление задачи
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();  // Отменяем стандартное поведение формы
    const title = taskInput.value;
    if (!title) return;  // Если поле пустое, не отправляем запрос
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
    });
    const task = await res.json();
    addTaskToDOM(task);  // Добавляем только что созданную задачу в DOM
    taskInput.value = '';  // Очищаем поле ввода
});

// Удаление задачи
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadTasks();  // После удаления перезагружаем задачи
}

// Переключение статуса задачи
async function toggleTask(id, completed) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
    });
    loadTasks();  // Перезагружаем задачи, чтобы обновить их статус
}

// Инициализация
loadTasks();
