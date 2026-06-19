const express = require("express");
const { todos } = require("./data/memory")

const router = express.Router()

router.get('/todos', (req,res) => {
    return res.status(200).json ({
        tarefas: todos
    })
})

router.put('/todos', (req, res) => {
    r
})

router.post('/todos', (req, res) => {
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