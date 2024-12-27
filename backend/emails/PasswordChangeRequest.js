import html from './utils.js'

const PasswordChangeRequest = (url) => {
    const content = `
        <p style="margin: 15px 0;">We received a request to reset the password for your account associated with this email address. If you made this request, please reset your password by clicking the button below:</p>
        <p style="margin: 15px 0; text-align: center;"><a href="${url}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #032325; text-decoration: none; border-radius: 5px;">Reset My Password</a></p>
        <p style="margin: 15px 0;">If the button above doesn't work, copy and paste the following URL into your browser:</p>
        <p style="margin: 15px 0; font-size: 14px; color: #666666;"><a href="${url}" style="color: #032325; text-decoration: none;">${url}</a></p>
        <p style="margin: 15px 0;">This link will expire in <strong>15 minutes</strong>. If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
    `

    return html({
        title: "Account Recovery",
        content
    });
}

export default PasswordChangeRequest
