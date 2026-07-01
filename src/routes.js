const express = require("express");
const { todos } = require("./data/memory");
const { autenticacaoMiddleware } = require("./auth")
const { connectDB } = require("./database")

const router = express.Router()

router.get('/todos', async (req,res) => {
    const db = await connectDB();
    const todos = await db.all('SELECT * FROM todos');

    return res.status(200).json ({
        tarefas: todos
    })
})

router.put('/todos', autenticacaoMiddleware, async (req, res) => {

    const db = await connectDB();
    const result = await db.run('UPDATE todos SET titulo = ? WHERE titulo = ?', novoTitulo, titulo);
    
    const { titulo, novoTitulo } = req.body;

    for (let i = 0; i < todos.length; i++) {
        if (titulo === todos[i].titulo) {
            todos[i].titulo = novoTitulo;
            return res.status(200).json(todos[i], { mensagem: "Informação atualizada!"})
        } else {
            return res.status(400).json({ mensagem: "Título não foi encontrado."})
        }
    }
})

router.delete('/todos', async (req, res) => {

    const db = await connectDB();
    const result = await db.run('DELETE FROM todos WHERE titulo = ?', titulo);

    const { titulo } = req.body;
    for (let i = 0; i < todos.length; i++) {
        if (titulo === todos[i].titulo) {
            todos.splice(i, 1)
            return res.status(200).json({ mensagem: "Tarefa deletada com sucesso!"})
        } else {
            return res.status(400).json({ mensagem: "Algo está errado!"})
        }
    }
})

router.post('/todos', async (req, res) => {
    
    const db = await connectDB();
    const result = await db.run('INSERT INTO todos (titulo, descricao, feito) VALUES (?, ?, ?)', titulo, descricao, false);

    const { titulo, descricao } = req.body;

    if (!titulo) {
        return res.status(400).json({ mensagem: "Título é obrigatório"})
    }

    const novaTarefa = {
        id: new Date().toString(),
        titulo,
        descricao,
        feito: false
    }

    todos.push(novaTarefa)

    res.status(201).json({
        mensagem: "Tarefa criada com sucesso",
        tarefaCriada: novaTarefa
    })
})

module.exports = router;