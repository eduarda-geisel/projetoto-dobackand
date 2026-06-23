const express = require("express");
const { todos } = require("./data/memory")

const router = express.Router()

router.get('/todos', (req,res) => {
    return res.status(200).json ({
        tarefas: todos
    })
})

router.put('/todos', (req, res) => {
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

router.delete('/todos', (req, res) => {
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