const header = (title) => {
    return `
        <div style="background-color: #032325; padding: 20px; text-align: center;">
            <span>Changes</span>
            <h1 style="font-size: 24px; color: #fff; margin: 0;">${title}</h1>
        </div>
    `
}

const footer = () => {
    return `
        <div style="background-color: #f7f9fc; text-align: center; padding: 10px 20px; font-size: 12px; color: #999999;">
            <p style="font-size: 12px; color: #999999; text-align: center;">This email is system-generated. Please do not reply to this email.</p>
            <p style="margin: 0;">&copy; 2024 AI Quiz App. All rights reserved.</p>
        </div>
    `
}

const html = ({ title, content }) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f7f9fc;">
            <div style="max-width: 600px; margin: 20px auto; background: #ffffff; border: 1px solid #e3e7ed; border-radius: 8px; overflow: hidden;">
                ${header(title)}
                <div style="padding: 20px; padding-bottom: 0; text-align: left; color: #333333;">
                    <div>
                        ${content}
                    </div>
                    <hr style="border: none; border-top: 1px solid #e3e7ed; margin: 20px 0;">
                </div>
                ${footer()}
            </div>
        </body>
        </html>
    `
}

export default html