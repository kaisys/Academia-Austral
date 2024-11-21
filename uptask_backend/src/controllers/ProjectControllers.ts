import type{Request, Response} from 'express'
import Project from '../models/Project'
import { Error } from 'mongoose'

export class ProjectController{
    static createProyect = async(req: Request, res: Response) => {
        const project = new Project(req.body)

        // Asignar Manager
        project.manager = req.user.id

        try {
          await project.save()
          res.send('Proyecto Creado')  
        } catch (error) {
            console.log(error)
        }

    }

    static getAllProjects = async(req: Request, res: Response)=> {
        try {
           const projects = await Project.find({
            $or:[
                {manager:{$in:req.user.id}}
            ]
           })
           res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }

    static getProjectById = async(req: Request, res: Response): Promise<void>  => {
        const { id } = req.params
        try {
           const project = await (await Project.findById(id)).populate('tasks')

           if(!project){
            const error = new Error('projecto no encontrado')
            res.status(404).json({error: error.message})
            return 
           }
           if(project.manager.toString() !== req.user.id.toString()){
            const error = new Error('Acción no válida.')
            res.status(404).json({error: error.message})
            return       
           }
           res.json(project)
        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async(req: Request, res: Response): Promise<void>  => {
        const { id } = req.params
        try {
            const project = await Project.findById(id)
            if(!project){
                const error = new Error('projecto no encontrado')
                res.status(404).json({error: error.message})
                return 
               }
               if(project.manager.toString() !== req.user.id.toString()){
                const error = new Error('Solo su propietario puede actualizar este proyecto.')
                res.status(404).json({error: error.message})
                return       
               }
            project.clientName = req.body.clientName
            project.projectName = req.body.projectName
            project.description = req.body.description
            await project.save()
            res.send('Proyecto Actualizado')
            return
        } catch (error) {
            console.log(error)
        }
    }

    static deleteProject = async(req: Request, res: Response): Promise<void>  => {
        const { id } = req.params
        try {
            const project = await Project.findById(id)
            if(!project){
                console.log('mensaje no funciona')
                
               }
               if(project.manager.toString() !== req.user.id.toString()){
                const error = new Error('Solo el propietario puede eliminar este proyecto.')
                res.status(404).json({error: error.message})
                return       
               }
            await project.deleteOne()
            res.send('Proyecto eliminado')
        } catch (error) {
            console.log(error)
        }
    }
}
