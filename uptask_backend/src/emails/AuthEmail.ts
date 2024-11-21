import { transporter } from "../config/nodemailer";

interface IEmail{
    email: string
    name: string
    token: string
}
export class AuthEmail{
    static sendConfirmationEmail = async (user: IEmail)=>{
        // Enviar email de confirmación
        const info = await transporter.sendMail({
            from: 'UPTASK <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - confirma tu cuenta',
            text: 'Uptask . Confirma tu cuenta',
            html: `<p>Hola: ${user.name}, has creado tu cuenta en UpTask, ya casi esta todo listo, solo debes confirmar tu cuenta</p>
            
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirma tu cuenta</a>
            <p>E ingresa el código: <b>${user.token}</b></p>
            <p>Este Token Expira en 15 minutos</p>`,
        });  
        
        console.log('Mensaje Enviado', info.messageId)
    }

    static sendPasswordResetToken = async (user: IEmail)=>{
        // Enviar email de confirmación
        const info = await transporter.sendMail({
            from: 'UPTASK <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - Reestablece tu contraseña',
            text: 'Uptask . Reestablece tu contraseña',
            html: `<p>Hola: ${user.name}, Haz solicitado reestablecer tu contraseña. En el siguiente link podrás hacerlo.</p>
            
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablece tu contraseña.</a>
            <p>E ingresa el código: <b>${user.token}</b></p>
            <p>Este Token Expira en 15 minutos</p>`,
        });  
        
        console.log('Mensaje Enviado', info.messageId)
    }
}