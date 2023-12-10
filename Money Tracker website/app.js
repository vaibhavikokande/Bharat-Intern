const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/moneytracker', { useNewUrlParser: true, useUnifiedTopology: true });

const expenseSchema = new mongoose.Schema({
    description: String,
    amount: Number
});

const Expense = mongoose.model('Expense', expenseSchema);

app.post('/addExpense', (req, res) => {
    const { description, amount } = req.body;
    const newExpense = new Expense({ description, amount });

    newExpense.save((err, expense) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(expense);
        }
    });
});

app.get('/getExpenses', (req, res) => {
    Expense.find({}, (err, expenses) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(expenses);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
