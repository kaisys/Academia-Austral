import {Router} from 'express'
import { body, param } from 'express-validator'
import { AuthController } from '../controllers/AuthControllers'
import { handleInputErrors } from '../middleware/validation'
import { authenticate } from '../middleware/auth'

const router = Router()

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre no puede estar vacio'),
    body('password')
        .isLength({min:8}).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('Los Password no son iguales')
        }
        return true
    }),
    body('email')
        .isEmail().withMessage('Email no Valido'),
    handleInputErrors,
    AuthController.createAccount
)

router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El token no puede estar vacio'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email')
        .notEmpty().withMessage('El nombre no puede estar vacio'),
    body('password')
        .notEmpty().withMessage('El password no puede estar vacío'),
    handleInputErrors,
    AuthController.login
)

router.post('/request-code',
    body('email')
        .notEmpty().withMessage('El mail no puede estar vacío'),
    handleInputErrors,
    AuthController.requestConfirmationCode
)

router.post('/forgot-password',
    body('email')
        .notEmpty().withMessage('El mail no puede estar vacío'),
    handleInputErrors,
    AuthController.forgotPassword
)
router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('El token no puede estar vacio'),
    handleInputErrors,
    AuthController.validateToken
)

router.post('/update-password/:token',
    param('token')
        .isNumeric().withMessage('Token no valido'),
    body('password')
        .isLength({min:8}).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('Los Password no son iguales')
        }
        return true
    }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
)

router.get('/user', 
    authenticate, 
    AuthController.user )
export default router