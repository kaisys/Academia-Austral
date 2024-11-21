import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const config = () => ({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT || 2525, // Si SMTP_PORT no está definido, usará el puerto 2525
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export const transporter = nodemailer.createTransport(config());
