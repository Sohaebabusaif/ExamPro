const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve frontend files

// Setup Database
const db = new sqlite3.Database('./exam_system.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS exams (
                id TEXT PRIMARY KEY,
                settings TEXT,
                questions TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        db.run(`
            CREATE TABLE IF NOT EXISTS submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                examId TEXT,
                studentName TEXT,
                studentClass TEXT,
                studentSection TEXT,
                score INTEGER,
                totalScore INTEGER,
                answers TEXT,
                submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
});

// API Routes

// 1. Save an Exam (Teacher)
app.post('/api/exams', (req, res) => {
    const { id, settings, questions } = req.body;
    db.run(`INSERT OR REPLACE INTO exams (id, settings, questions) VALUES (?, ?, ?)`,
        [id, JSON.stringify(settings), JSON.stringify(questions)],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Exam saved successfully', examId: id });
        }
    );
});

// 2. Get an Exam (Student)
app.get('/api/exams/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM exams WHERE id = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Exam not found' });
        res.json({
            id: row.id,
            settings: JSON.parse(row.settings),
            questions: JSON.parse(row.questions)
        });
    });
});

// 3. Submit Exam (Student)
app.post('/api/submissions', (req, res) => {
    const { examId, studentName, studentClass, studentSection, score, totalScore, answers } = req.body;
    db.run(`INSERT INTO submissions (examId, studentName, studentClass, studentSection, score, totalScore, answers) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [examId, studentName, studentClass, studentSection, score, totalScore, JSON.stringify(answers)],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Submission successful', submissionId: this.lastID });
        }
    );
});

// 4. Get Submissions (Teacher)
app.get('/api/exams/:id/submissions', (req, res) => {
    const { id } = req.params;
    db.all(`SELECT * FROM submissions WHERE examId = ?`, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const parsedRows = rows.map(r => ({ ...r, answers: JSON.parse(r.answers) }));
        res.json(parsedRows);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
