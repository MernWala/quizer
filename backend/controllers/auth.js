import UserSchema from '../models/User.js'
import bcrypt from 'bcrypt'
import CustomError from '../middleware/ErrorMiddleware.js'
import SendEmail from '../utils/SendEmail.js'
import jwt from 'jsonwebtoken'
import AccountVerification from '../emails/AccountVerificationEmail.js'
import PasswordChangeRequest from '../emails/PasswordChangeRequest.js'
import PasswordChangeAcknowledgement from '../emails/PasswordChangeAcknow.js'
import { JWT_SECRET, PRODUCTION } from '../config.js'


const hashString = async (str) => {
    return await bcrypt.hash(Pass, 20);
}

const RegisterUser = async ({ name, role, email, pass }) => {
    const hashPass = await hashString(pass);
    const user = new UserSchema({ name, role, email, hashPass });
    await user.save()
    return user
};

const generateToken = (data, options) => {
    return jwt.sign(data, JWT_SECRET, options)
};

const jwtToPayload = (token) => {
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return {
            valid: true,
            payload,
            error: null
        };
    } catch (err) {
        return {
            valid: false,
            payload: null,
            error: err.name === 'TokenExpiredError' ? 'Token has expired' : 'Invalid token',
        };
    }
};

const cookieOptions = {
    httpOnly: true,  // Prevent access to cookie via client-side scripts
    secure: JSON.parse(PRODUCTION ?? "false"),   // JSON("true") -> true || JSON("false") -> false
    path: '/',      // Cookie will be available for the entire domain
    sameSite: 'none',  // Required for cross-origin cookies
    maxAge: 1000 * 60 * 60 * 24, // Cookie expires after 1 day (value in milliseconds) || {1 second: 1000 millisecond}
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),  // Alternatively, set an explicit expiration date/time
};

const compareString = (str1, str2) => {
    if (str1.length !== str2.length) {
        return false
    }

    const arr1 = str1.split("")
    const arr2 = str2.split("")

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false
    }

    return true
}

export const ManualRegister = async (req, res) => {
    try {
        const user = await UserSchema.findOne({ email: req.body.email })
        // TODO: update url -> account verification of frontend
        const frontendPath = "<frontend-url>"

        if (!user || !user?.verified) {

            user = await RegisterUser(req.body);
            const verificationToken = generateToken({ _id: user?._id, email: user?.email }, { expiresIn: 15 * 60 })
            const url = `${frontendPath}?token=${verificationToken}`

            const mail = await SendEmail({
                to: user?.email,
                subject: "Account Verification",
                html: AccountVerification(url),
            });

            return res.json({
                register: true,
                user,
                email: mail ? true : false
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

        const { email, password } = req.body;
        const user = await UserSchema.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        res.cookie("token", token, cookieOptions);

        return res.status(200).json({ message: "Login successful", token, user });

    } catch (error) {
        CustomError(error, res);
    }
};

export const PasswordReset_Send = async (req, res) => {
    try {

        const { email } = req.body
        const user = await UserSchema.findOne({ email })
        // TODO: update url -> account recovery of frontend
        const frontendPath = "<frontend-url>"

        if (!user) {

            return res.status(404).json({
                mail: false,
                error: "User with this email does'nt exist"
            })

        } else {

            const token = generateToken({ _id: user?._id, email: user?.email }, { expiresIn: 15 * 60 });
            const url = `${frontendPath}?token=${token}`

            const update = await UserSchema.findOneAndUpdate(
                { email },
                { $set: { recoveryToken: token } },
                { new: true }
            );

            const mail = await SendEmail({
                to: req?.body?.email,
                subject: "Account Recovery",
                html: PasswordChangeRequest(url)
            })

            return res.json({
                mail: mail ? true : false,
                error: mail && update ? false : true,
            })
        }

    } catch (error) {
        CustomError(error)
    }
}

export const PasswordReset_Reset = async (req, res) => {
    try {

        const { token } = req.query
        const { pass } = req.body
        const { valid, expired, decoded } = jwtToPayload(token);

        if (!valid) {
            return res.status(400).json({
                reset: false,
                update: null,
                message: expired ? "Token has expired! Please try to register again." : "Invalid token!",
            });
        };

        let user = await UserSchema.findById({ _id: decoded?._id })
        if (!user) {
            return res.status(404).json({
                reset: false,
                update: null,
                message: "User with this email not found.",
            })
        }

        // mathing two jwt => core-character match
        const matched = compareString(JSON.stringify(token))
        if (matched) {
            const hashPass = await hashString(pass)
            const update = await UserSchema.findByIdAndUpdate(
                { _id: decoded?._id },
                { $set: { hashPass } },
                { new: true } // Return the updated document
            );

            // TODO: insert contact url
            const url = "<frontend-path>"
            const email = await SendEmail({
                to: update?.email,
                subject: "Password Change Acknowledgement",
                html: PasswordChangeAcknowledgement(url),
            })

            return res.json({
                reset: true,
                update,
                email,
                message: "Password has been updated."
            });
        }

        return res.json({
            reset: false,
            update: null,
            message: "Token malfunctioned! Try to re-send password request.",
        })

    } catch (error) {
        CustomError(error)
    }
}
