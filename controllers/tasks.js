const Task = require('../models/task')
const {createCustomError} = require('../errors/custom-error')
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})
const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
})
const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params
    const task = await Task.findById(taskID)
    if(!task) {
        return next(createCustomError('Not Found', 404))
    }
    res.status(200).json({task})
})
const updateTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params
    const {body: taskBODY} = req
    const task = await Task.findByIdAndUpdate(taskID, taskBODY, {
        new: true,
        runValidators: true
    })
    if(!task) { return res.status(404).json({msg:`no task with id:${taskID}`})}
    res.status(201).json({task})
})
const deleteTask = asyncWrapper( async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findByIdAndDelete(taskID)
    if(!task) {
        return res.status(404).json({msg: `no task with id:${taskID}`})
    }
    res.status(200).json('Deleted')
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}