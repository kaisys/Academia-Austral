import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import EditProjectForm from "@/componets/projects/EditProjectForm"

export default function EditProjectView() {

    const { projectId } = useParams<{ projectId: string }>()
 
    const { data, isLoading, isError} = useQuery({
      queryKey: ['editProject', projectId],
      queryFn: () => getProjectById(projectId),
      retry: false
    })

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404' />

    if(data) return <EditProjectForm data={data} projectId={projectId} />

  return (
    <div>EditProjectView</div>
  )
}
