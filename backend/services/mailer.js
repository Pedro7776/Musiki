import { configDotenv } from "dotenv";
configDotenv()

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// TODO: Mudar essa estrutura pra um Redis
var OTPEmailList = new Map()
var ChangePassTokens = new Map()

const sendEmail = async (recipientID) => {
    try {
        await transporter.verify();
        const OTP = generateOTP();
        const info = await transporter.sendMail({
            from: '"Musiki" <suporte.musiki@gmail.com>', // sender address
            to: recipientID,
            subject: "Recuperar senha", // subject line
            text: `oii ${OTP}`, // plain text body
            html: `<b>${OTP}</b>`, // HTML body
        });
        OTPEmailList.set(recipientID, OTP)
        setTimeout(() => {
            OTPEmailList.delete(recipientID)
        }, 1000 * 60 * 15)

        console.log("Message sent: %s", info.messageId);
    }catch(err) {
        console.error("Error while sending mail:", err);
        return {error: 'Erro ao enviar email'}
    }
}

const checkOTP = (email, code) => {
    try{
        if(OTPEmailList.get(email) == code){
            OTPEmailList.delete(email)
            const changePassToken = generateRandomToken()
            ChangePassTokens.set(email, changePassToken)
            setTimeout(() => {
                ChangePassTokens.delete(email)
            }, 1000 * 60 * 5)
            return { ok: true, token: changePassToken }
        }
        return { error: 'Código enviado incorreto' }
    }catch(err) {
        return err
    }
}

const checkChangePassToken = (email, token) => {
    try {
        if(ChangePassTokens.get(email) == token){
            ChangePassTokens.delete(email)
            return { ok: true }
        }
        return { ok: false }
    }catch(err) {
        return { error: 'Falha ao autenticar token'}
    }
}

const generateRandomToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var code = ''
    for(var i = 0; i <= 32; i++){
        code += characters.charAt(Math.random() * characters.length)
    }
    return code
}

const generateOTP = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var code = ''
    for(var i = 0; i <= 6; i++){
        code += characters.charAt(Math.random() * characters.length)
    }
    return code
}

export { 
    sendEmail,
    checkOTP,
    checkChangePassToken
}