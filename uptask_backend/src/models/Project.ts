import mongoose, {Schema, Document, PopulatedDoc, Types} from 'mongoose'
import { ITask } from './Task'
import { IUser } from './User'

export interface IProject extends Document {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[] //como son multi task se usa el corchete
    manager: PopulatedDoc<IUser & Document> //solo tiene un manager el proyecto por eso es sin corchetes
}

const ProjectSchema: Schema = new Schema({
    projectName:{
        type: String,
        required: true,
        trim: true
    },
    clientName:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        },
    ],
    manager:{
            type: Types.ObjectId,
            ref: 'User'
    }

})


const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project