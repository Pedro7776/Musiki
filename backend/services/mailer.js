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

var OTPEmailList = new Map()

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
        }, 1000 * 60 * 5)

        console.log("Message sent: %s", info.messageId);
    }catch(err) {
        console.error("Error while sending mail:", err);
    }
}

const checkOTP = (recipientID, code) => {
    try{
        if(OTPEmailList.get(recipientID) == code){
            console.log("ACERTOOU")
        }
    }catch(err) {

    }
}

const generateOTP = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var code = ''
    for(var i = 0; i <= 6; i++){
        code += characters.charAt(Math.random() * 36)
    }
    return code
}

export { sendEmail }