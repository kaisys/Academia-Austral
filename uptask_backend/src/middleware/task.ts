import type {Request, Response, NextFunction} from 'express'
import Task, { ITask } from '../models/Task'

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export async function taskExist(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const{taskId} = req.params;
        const task = await Task.findById(taskId);
        if(!task){
            const error = new Error('Tarea no encontrada');
            res.status(404).json({error: error.message});
            return    
           }
           req.task = task
           next()
    } catch (error) {
        console.log(error);
    }
}

export async function taskBelongsToProject(req: Request, res: Response, next: NextFunction): Promise<void>{
    if(req.task.project.toString() !== req.project.id.toString()){
        const error = new Error('Accion no válida')
        res.status(400).json({error: error.message})
        return
    }   
    console.log('adios de task belong')   
}