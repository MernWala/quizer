import html from './utils.js'

const PasswordChangeAcknowledgement = (SUPPORT_LINK) => {
    const content = `
        <p style="margin: 15px 0;">Your password has been successfully changed for your account associated with this email address. If you did not make this change, please contact us immediately to secure your account.</p>
        <p style="margin: 15px 0;">If you recently changed your password, you can now log in with your new password. Make sure to keep it secure!</p>
        <p style="margin: 15px 0;">If you did not request this change or believe your account has been compromised, please reach out to our support team as soon as possible.</p>
        <p style="margin: 15px 0; text-align: center;">
            <a href="${SUPPORT_LINK}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #032325; text-decoration: none; border-radius: 5px;">Contact Support</a>
        </p>
        <p style="margin: 15px 0; font-size: 14px; color: #666666;">
            Our support team is available 24/7 to assist you. Click the button above to get in touch with us.
        </p>
        <p style="margin: 15px 0; font-size: 14px; color: #666666;">
            If the button above doesn't work, please copy and paste the following link into your browser:
        </p>
        <p style="margin: 15px 0; font-size: 14px; color: #032325;">
            <a href="${SUPPORT_LINK}" style="color: #032325; text-decoration: none;">${SUPPORT_LINK}</a>
        </p>
    `

    return html({
        title: "Password Change Confirmation",
        content
    });
}

export default PasswordChangeAcknowledgement
