const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Для работы с путями

const db = require('./db'); // Импорт базы данных

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Настройка для обслуживания статических файлов из папки /public
app.use(express.static(path.join(__dirname, '../public')));

// Получение всех задач
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Добавление новой задачи
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const query = 'INSERT INTO tasks (title) VALUES (?)';
    db.query(query, [title], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, title, completed: false });
    });
});

// Удаление задачи
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [id], err => {
        if (err) throw err;
        res.json({ success: true });
    });
});

// Обновление статуса задачи
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
    db.query(query, [completed, id], err => {
        if (err) throw err;
        res.json({ success: true });
    });
});

// Запуск сервера на порту 3000
app.listen(3000, () => console.log('Server running on http://localhost:3000'));



// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const db = require('./db');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Получение всех задач
// app.get('/tasks', (req, res) => {
//     db.query('SELECT * FROM tasks', (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

// // Добавление новой задачи
// app.post('/tasks', (req, res) => {
//     const { title } = req.body;
//     const query = 'INSERT INTO tasks (title) VALUES (?)';
//     db.query(query, [title], (err, result) => {
//         if (err) throw err;
//         res.json({ id: result.insertId, title, completed: false });
//     });
// });

// // Удаление задачи
// app.delete('/tasks/:id', (req, res) => {
//     const { id } = req.params;
//     const query = 'DELETE FROM tasks WHERE id = ?';
//     db.query(query, [id], err => {
//         if (err) throw err;
//         res.json({ success: true });
//     });
// });

// // Обновление статуса задачи
// app.put('/tasks/:id', (req, res) => {
//     const { id } = req.params;
//     const { completed } = req.body;
//     const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
//     db.query(query, [completed, id], err => {
//         if (err) throw err;
//         res.json({ success: true });
//     });
// });

// app.listen(3000, () => console.log('Server running on http://localhost:3000'));
