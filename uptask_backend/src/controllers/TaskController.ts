import type {Request, Response} from 'express'
import Task from '../models/Task'
import mongoose from 'mongoose'

export class TaskController{
    static createTask = async(req: Request, res: Response): Promise<void> => {
        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)

            await Promise.allSettled([task.save(), req.project.save()])
            res.send('tarea creada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getProjectTask = async(req: Request, res: Response): Promise<void> => {
        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')

            res.json(tasks)
            res.send('tarea creada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getTaskById = async(req: Request, res: Response): Promise<void> => {
        console.log('estoy en el controlador')
        try {
            res.json(req.task)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static updateTask = async(req: Request, res: Response): Promise<void> => {
        try {

            if(req.task.project.toString() !== req.project.id){
                const error = new Error('Accion no válida')
                res.status(400).json({error: error.message})
                return
            }
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()

            res.send("Tarea Actualizada")
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }


    static deleteTask = async(req: Request, res: Response): Promise<void> => {
        try {
            
            req.project.tasks = req.project.tasks.filter( task => task.toString() != req.task.id.toString())

            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            res.send("Tarea Eliminada")

        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static updateStatus = async(req: Request, res: Response): Promise<void> => {
        try {

            const {status} = req.body
            req.task.status = status
            await req.task.save()
            res.send('Tarea Actualizada')


        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

}