import html from "./utils"

const AccountActivateSend = (userName, reactivateLink) => {
    const content = `
        <p style="margin: 15px 0;">Dear ${userName},</p>
        <p style="margin: 15px 0;">We're excited to inform you that you can now reactivate your account and regain access to all your data and features. Follow the link below to complete the reactivation process:</p>
        <p style="margin: 15px 0; text-align: center;">
            <a href="${reactivateLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #032325; text-decoration: none; border-radius: 5px;">Reactivate My Account</a>
        </p>
        <p style="margin: 15px 0; text-align: center; font-size: 14px; color: #666666;">
            If the button above doesn't work, please copy and paste the following link into your browser:
        </p>
        <p style="margin: 15px 0; text-align: center; font-size: 14px; color: #032325;">
            <a href="${reactivateLink}" style="color: #032325; text-decoration: none;">${reactivateLink}</a>
        </p>
        <p style="margin: 15px 0;">Once your account is reactivated, you'll regain full access to your dashboard, previously created question sets, and all other features. Any quizzes you published earlier will also become available to participants.</p>
    `

    return html({
        title: "Reactivate Your Account",
        content
    })
}

export default AccountActivateSend