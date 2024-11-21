import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTaskById } from "@/api/TaskApi";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('editTask')!;

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ projectId, taskId }),  // `formData` ya no es necesario
        enabled: !!taskId
    });

    if (isError) return <Navigate to={'/404'}/>;
    if (data) return <EditTaskModal data={data} taskId={taskId} />;

    return null;  // Agrega una devolución para el caso en que no haya error ni datos
}
