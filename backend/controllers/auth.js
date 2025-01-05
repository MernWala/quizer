import UserSchema from '../models/User.js'
import CustomError from '../middleware/ErrorMiddleware.js'
import SendEmail from '../utils/SendEmail.js'
import emailTemplates from '../emails/main.js'
import { FRONTENDHOST } from '../config.js'
import { cookieOptions, hashString, RegisterUser, generateToken, jwtToPayload, comparePassword, compareString } from '../utils/Genral.js'

const {
    AccountActivateSend,
    AccountDeactivateAcknowledgement,
    AccountVerification,
    PasswordChangeAcknowledgement,
    PasswordChangeRequest,
} = emailTemplates

export const ManualRegister = async (req, res) => {
    try {
        let user = await UserSchema.findOne({ email: req.body.email })

        if (!user || !user?.verified) {
            if (!user) {
                user = await RegisterUser(req.body);
            }

            const verificationToken = generateToken({ _id: user?._id, email: user?.email }, { expiresIn: 15 * 60 })
            const mail = await SendEmail({
                to: user?.email,
                subject: "Account Verification",
                // TODO: Link check
                html: AccountVerification(`${FRONTENDHOST}/account/verify?token=${verificationToken}`),
            });

            return res.json({
                register: true,
                user,
                mail: mail ? true : false,
            });

        } else {
            return res.json({ register: false, error: "User with  already exist!" });
        }

    } catch (error) {
        CustomError(error, res)
    }
};

export const ManualVerifyAccount = async (req, res) => {
    try {
        const { token } = req.query;
        const { valid, expired, decoded } = jwtToPayload(token);

        if (!valid) {
            return res.status(400).json({
                verify: false,
                message: expired ? "Token has expired! Please try to register again." : "Invalid token!",
            });
        }

        const user = await UserSchema.findByIdAndUpdate(
            { _id: decoded?._id },
            { $set: { verified: true } },
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ verify: false, message: "User not found!" });
        }

        return res.status(200).json({
            verify: true,
            user,
            message: "Account successfully verified.",
        });
    } catch (error) {
        CustomError(error, res);
    }
};

export const ManualLogin = async (req, res) => {
    try {

        const { email, pass } = req.body;
        const user = await UserSchema.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "User with this email not found."
            });
        }

        if (user?.deactivate) {
            return res.status(400).json({
                error: true,
                message: "Account is deactivated."
            })
        }

        const isMatch = await comparePassword(pass, user?.hashPass);
        if (!isMatch) {
            return res.status(401).json({
                error: true,
                message: "Invalid credentials"
            });
        }

        const token = generateToken({ _id: user?._id });
        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            token,
            user,
            message: "Login successful",
        });

    } catch (error) {
        CustomError(error, res);
    }
};

export const PasswordReset_Send = async (req, res) => {
    try {

        const { email } = req.body
        const user = await UserSchema.findOne({ email })

        if (!user) {
            return res.status(404).json({
                mail: false,
                error: "User with this email does'nt exist!"
            })
        }

        const token = generateToken({ _id: user?._id, email: user?.email }, { expiresIn: 15 * 60 });
        const update = await UserSchema.findOneAndUpdate(
            { email },
            { $set: { recoveryToken: token } },
            { new: true }
        );

        const mail = await SendEmail({
            to: email,
            subject: req?.body?.activate ? "Account Activation" : "Account Recovery",
            // TODO: Link check
            html: req?.body?.activate ? AccountActivateSend(user?.name, `${FRONTENDHOST}/#/?token=${token}&activation=true`) : PasswordChangeRequest(`${FRONTENDHOST}/#/?token=${token}&passwordreset=true`),
        })

        return res.json({
            mail: mail ? true : false,
            error: mail && update ? false : true,
            activation: req?.body?.activate ? true : false,
            passwordreset: req?.body?.activate ? false : true,
            token,
        })

    } catch (error) {
        CustomError(error, res)
    }
};

export const PasswordReset_Reset = async (req, res) => {
    try {

        const { token } = req.query
        const { pass } = req.body
        const { valid, expired, decoded } = jwtToPayload(token);

        if (!valid) {
            return res.status(400).json({
                reset: false,
                message: expired ? "Token has expired! Please try to register again." : "Invalid token!",
            });
        };

        let user = await UserSchema.findById({ _id: decoded?._id })
        if (!user) {
            return res.status(404).json({
                reset: false,
                message: "User with this email not found.",
            })
        }

        const matched = compareString(JSON.stringify(token), JSON.stringify(user?.recoveryToken));
        if (matched) {
            const hashPass = await hashString(pass)
            const update = await UserSchema.findByIdAndUpdate(
                { _id: decoded?._id },
                { $set: { hashPass, recoveryToken: null } },
                { new: true } // Return the updated document
            );

            const email = await SendEmail({
                to: update?.email,
                subject: "Password Change Acknowledgement",
                html: PasswordChangeAcknowledgement(`${FRONTENDHOST}/#/contact`),
            })

            return res.json({
                reset: true,
                update,
                email: email ? true : false,
                message: "Password has been updated."
            });
        }

        return res.json({
            reset: false,
            message: "Token malfunctioned! Try to re-send password request.",
        })

    } catch (error) {
        CustomError(error, res)
    }
};

// Attempt to deactivate account || Only available for role: admin
export const DeactivateAccount = async (req, res) => {
    try {

        const { pass } = req.body
        const user = req.user

        const isMatch = await comparePassword(pass, user?.hashPass)
        if (!isMatch) {
            return res.status(400).json({
                error: true,
                message: "Invalid Password.",
            })
        }

        const update = await UserSchema.findByIdAndUpdate(
            { _id: user?.id },
            { $set: { deactivate: true } },
            { new: true }
        )

        const mail = await SendEmail({
            to: update?.email,
            subject: "Account Deactivation",
            // TODO: Link check
            html: AccountDeactivateAcknowledgement(update?.name, `${FRONTENDHOST}/`)
        })

        res.clearCookie('token');
        return res.json({
            error: false,
            mail: mail ? true : false,
            update,
            message: "Account has been deactivated.",
        })

    } catch (error) {
        CustomError(error, res);
    }
};

export const ReactivateAccount_Send = (req, res, next) => {
    try {

        req.body.activate = true
        next();

    } catch (error) {
        CustomError(error, res);
    }
};

export const ReactivateAccount_Activate = async (req, res) => {
    try {

        const { token } = req.query
        const { valid, expired, decoded } = jwtToPayload(token);

        if (!valid) {
            return res.status(400).json({
                reset: false,
                message: expired ? "Token has expired! Please try to register again." : "Invalid token!",
            });
        };

        let user = await UserSchema.findById({ _id: decoded?._id })
        if (!user) {
            return res.status(404).json({
                reset: false,
                message: "User with this email not found.",
            })
        }

        const matched = compareString(JSON.stringify(token), JSON.stringify(user?.recoveryToken))
        if (matched) {
            const update = await UserSchema.findByIdAndUpdate(
                { _id: user?.id },
                { $set: { deactivate: false, recoveryToken: null } },
                { new: true }
            )

            const token = generateToken({ _id: user?._id });
            res.cookie("token", token, cookieOptions);

            return res.status(200).json({
                token,
                update,
                message: "Account has been activated",
            });
        }

        return res.json({
            reset: false,
            message: "Token malfunctioned! Try to re-send password request.",
        })

    } catch (error) {
        CustomError(error, res)
    }
};
