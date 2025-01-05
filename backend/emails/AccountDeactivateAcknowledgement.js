import html from './utils.js'

const AccountDeactivateAck = (userName="DUMMY_NAME", url="DUMMY_LINK") => {
    const content = `
        <p style="margin: 15px 0;">Dear ${userName},</p>
        <p style="margin: 15px 0;">We're writing to confirm that your account has been successfully deactivated. Below is a summary of the changes applied:</p>
        <ul style="margin: 15px 0; padding-left: 20px; color: #555555;">
            <li style="margin: 10px 0;">All your published question sets are now hidden and will no longer appear in the database as available quizzes.</li>
            <li style="margin: 10px 0;">Participants cannot attempt any of your quizzes.</li>
            <li style="margin: 10px 0;">You will not have access to your dashboard or account details.</li>
            <li style="margin: 10px 0;">All your data, including question sets, is preserved and stored securely in our database.</li>
        </ul>
        <p style="margin: 15px 0;">You can reactivate your account at any time through a re-verification process, ensuring seamless restoration of your access and visibility of your question sets.</p>
        <p style="margin: 15px 0;">If you did not intend to deactivate your account or wish to regain access, click the button below to reactivate your account:</p>
        <p style="margin: 15px 0; text-align: center;">
            <a href="${url}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #032325; text-decoration: none; border-radius: 5px;">Reactivate Account</a>
        </p>
        <p style="margin: 15px 0; text-align: center; font-size: 14px; color: #666666;">
            If the button above doesn't work, please copy and paste the following link into your browser:
        </p>
        <p style="margin: 15px 0; text-align: center; font-size: 14px; color: #032325;">
            <a href="${url}" style="color: #032325; text-decoration: none;">${url}</a>
        </p>
    `

    return html({
        title: "Account Deactivation Notice",
        content
    });
}

export default AccountDeactivateAck