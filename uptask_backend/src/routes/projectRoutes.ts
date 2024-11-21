import {Router } from 'express'
import {body, param} from 'express-validator'
import { ProjectController } from '../controllers/ProjectControllers'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { projectExists } from '../middleware/project'
import { taskBelongsToProject, taskExist } from '../middleware/task'
import { authenticate } from '../middleware/auth'

const router = Router()
router.use(authenticate)

router.post('/',
    body('projectName').notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
    body('clientName').notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description').notEmpty().withMessage('La descripción es es Obligatoria'),
    handleInputErrors,
    ProjectController.createProyect
)
router.get('/', ProjectController.getAllProjects)

router.get('/:id', 
    param('id').isMongoId().withMessage('ID no Válido'),
    handleInputErrors,
    ProjectController.getProjectById
)

router.put('/:id', 
    param('id').isMongoId().withMessage('ID no Válido'),
    body('projectName').notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
    body('clientName').notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description').notEmpty().withMessage('La descripción es es Obligatoria'),
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id', 
    param('id').isMongoId().withMessage('ID no Válido'),
    handleInputErrors,
    ProjectController.deleteProject
)


/** ROUTES FOR TASK */
router.param('projectId', projectExists)
router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La  descripcion es obligatoria'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProjectTask
)

router.param('taskId', taskExist)
//router.param('taskId', taskBelongsToProject )
router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no Válido'),
    handleInputErrors,
    TaskController.getTaskById
)
console.log('ya sali del controlador')


router.post('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no Válido'),
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La  descripcion es obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no Válido'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID no Válido'),
    body('status')
        .notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
)

export default router