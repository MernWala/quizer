import html from './utils.js'

const AccountVerificationEmail = (url) => {
    const content = `
        <p style="margin: 15px 0;">Thank you for signing up for our AI-powered Quiz App! To activate your account, please verify your email by clicking the button below:</p>
        <p style="margin: 15px 0; text-align: center;">
            <a href="${url}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #00646b; text-decoration: none; border-radius: 5px;">Verify My Account</a>
        </p>
        <p style="margin: 15px 0;">If the button above doesn't work, copy and paste the following URL into your browser:</p>
        <p style="margin: 15px 0; font-size: 14px; color: #666666;">
            <a href="${url}" style="color: #00646b; text-decoration: none;">${url}</a>
        </p>
        <p style="margin: 15px 0;">This link will expire in <strong>15 minutes</strong>. If you did not sign up for this account, please ignore this email.</p>
    `

    return html({
        title: "Account Verification",
        content
    });
}

export default AccountVerificationEmail