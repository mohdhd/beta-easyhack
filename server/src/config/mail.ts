import * as nodemailer from "nodemailer";

export async function mail(email: string, hash: string) {

    const transporter = nodemailer.createTransport({
        host: 'mail.lunanode.net',
        port: 465,
        secure: true,
        auth: {
            user: 'info@easyhackctf.com',
            pass: 'pass@331',
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"EasyHack CTF" info@easyhackctf.com', // sender address
        to: email, // list of receivers
        subject: "Confirm Your Email",
       
        html: `
        <p>Please verify your email ${email} by clicking
        <a href="https://betabackend.easyhackctf.com/api/users/confirm/${hash}">here</a>
        </p>
        `, // html body
    });

    console.log("Message sent: %s", info.messageId);

}

export async function recoverUserPassword(email: string, hash: string) {
    const transporter = nodemailer.createTransport({
        host: 'mail.lunanode.net',
        port: 465,
        secure: true,
        auth: {
            user: 'info@easyhackctf.com',
            pass: 'pass@331',
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"EasyHack CTF" info@easyhackctf.com', // sender address
        to: email, // list of receivers
        subject: "Password Recovery",
        html: `
        <p>To reset your password, visit this  <a href="https://betabackend.easyhackctf.com/api/users/recover_password/${hash}">link</a> 
        and then enter your new password
        </p>
        `, // html body
    });

    console.log("Message sent: %s", info.messageId);
}
