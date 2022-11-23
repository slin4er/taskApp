const Task = require('../models/task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (err) {
        res.status(500).json(err.message)
    }
}
const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if(!task) { throw new Error('Task was not found')}
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if(!task) { throw new Error('Task was not found')}
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(201).json({updatedTask})
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if(!task) throw new Error('Task was not found')
        await Task.deleteOne(task)
        res.status(200).json('Deleted')
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}