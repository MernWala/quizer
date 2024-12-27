import express from 'express'
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectToDB from './middleware/ConnectToDB.js'
import commonMainRoute from './routes/common/main.js'
import clientMainRoute from './routes/client/main.js'
import adminMainRoute from './routes/admin/main.js'
import superAdminMainRoute from './routes/super_admin/main.js'

const app = express()
const port = process.env.PORT || 5000

// White-listed Host
const whitelist = [
    'http://localhost:3000',
    'http://localhost:5000',
];

// Cors Setup
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origin is not white-listed. Connect to developer fot it.'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // Security headers
app.use(connectToDB)

// Forwarding to common routes
app.use("/api/common", commonMainRoute)

// Forwarding current route to sub routes
app.use("/api/client/", clientMainRoute);
app.use("/api/admin/", adminMainRoute);
app.use("/api/super_admin/", superAdminMainRoute);

// Listening express app
app.listen(port, () => {
    console.log(`BACKEND SERVER LISTENING AT: ${port}`)
})
