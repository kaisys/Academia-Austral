import { Navigate, useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/componets/tasks/AddTaskModal"
import TaskList from "@/componets/tasks/TaskList"
import EditTaskData from "@/componets/tasks/EditTaskData"
import TaskModalDetails from "@/componets/tasks/TaskModalDetails"

export default function ProjectDetailsView() {

    const navigate = useNavigate()
    const { projectId } = useParams<{ projectId: string }>()
 
    const { data, isLoading, isError} = useQuery({
      queryKey: ['project', projectId],
      queryFn: () => getProjectById(projectId),
      retry: false
    })

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404' />
    console.log(data)

    if(data) return (
    <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
        <nav className="my-5 flec gap-3">
           <button 
            className="bg-emerald-800 hover:bg-emerald-900 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            type="button"
            onClick={() => navigate(location.pathname+'?newTask=true')}
           >
            Agregar Tarea</button> 
        </nav>
        <TaskList 
          tasks={data.tasks}
        />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />

    </>
  )
}
