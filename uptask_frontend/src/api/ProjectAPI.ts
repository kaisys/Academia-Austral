import { ProjectFormData,dashboardProjectSchema } from "@/types"
import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Project } from "../types"

export async function createProject(formData: ProjectFormData){
    try {
        const {data} = await api.post('/projects', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProyects(){
    try {
        const { data } = await api('/projects')
        console.log("Data received from API:", data)

        // Si data no es un array, podrías necesitar ajustar esto
        const response = dashboardProjectSchema.safeParse(data)
        console.log("Schema validation response:", response)
        
        if(response.success){
            return response.data
        } else {
            console.error("Data validation failed:", response.error)
            throw new Error("Data received does not match expected schema.")
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectById(id: Project['_id']| undefined) {
    try {
        const { data } = await api(`/projects/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

type ProjectApiType = {
    formData: ProjectFormData
    projectId: Project['_id']
}

export async function updateProject({formData, projectId}: ProjectApiType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteProject(id: Project['_id']| undefined) {
    try {
        const { data } = await api.delete<string>(`/projects/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}