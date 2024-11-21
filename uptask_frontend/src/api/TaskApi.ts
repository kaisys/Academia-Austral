import api from "@/lib/axios";
import { TaskFormData } from "@/types";
import { isAxiosError } from "axios";
import { Project, Task, taskSchema } from "@/types";

type TaskAPI = {
    formData: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

export async function createTask({formData, projectId}: Pick<TaskAPI, 'formData'|'projectId'>){
    try{
        const url = `/projects/${projectId}/tasks`
        const {data} = await api.post<string>(url, formData) 
        return data
    } catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskById({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'>): Promise<Task> {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.get(url); // Cambia el tipo de `data` a `Task`
        const response = taskSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
       if(isAxiosError(error) && error.response){
           throw new Error(error.response.data.error);
       } 
       throw error; // Lanza el error en caso de que no sea un error de Axios
    }
}

export async function updateTask({projectId, taskId, formData}: Pick<TaskAPI, 'projectId'|'taskId'|'formData'>){
    console.log("entre al mutate")
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }         
    }
}

export async function deleteTask({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'>): Promise<Task> {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.delete<string>(url); // Cambia el tipo de `data` a `Task`
        return data;
    } catch (error) {
       if(isAxiosError(error) && error.response){
           throw new Error(error.response.data.error);
       } 
       throw error; // Lanza el error en caso de que no sea un error de Axios
    }
}

export async function updateStatus({projectId, taskId, status}: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>): Promise<Task> {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`;
        const { data } = await api.post<string>(url, {status}); // Cambia el tipo de `data` a `Task`
        return data;
    } catch (error) {
       if(isAxiosError(error) && error.response){
           throw new Error(error.response.data.error);
       } 
       throw error; // Lanza el error en caso de que no sea un error de Axios
    }
}