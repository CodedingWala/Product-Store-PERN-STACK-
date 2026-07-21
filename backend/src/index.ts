// backend/src/index.ts
import express from "express";
import type { NextFunction, Request, Response } from "express";
import { clerkMiddleware } from '@clerk/express';
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env.js";
import userRoute from "./routes/UserRoutes.js";
import productRoute from "./routes/ProductRoute.js";
import commentRoute from "./routes/CommentRoute.js";
import job from "./lib/corn.js";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Start cron job if in production
if (ENV.NODE_ENV === "production") {
    job.start();
}

// CORS
app.use(cors({
    origin: ENV.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get("/api/health", (req: Request, res: Response) => {
    res.json({
        status: "ok",
        message: "Server is running",
        timestamp: new Date().toISOString()
    });
});

// ✅ Serve Frontend Static Files
const frontendPath = path.join(__dirname, "../../frontend/dist");
console.log(`📁 Serving frontend from: ${frontendPath}`);

if (fs.existsSync(frontendPath)) {
    console.log('✅ Frontend found, serving static files');
    app.use(express.static(frontendPath));
} else {
    console.log('❌ Frontend NOT found. Please build it:');
    console.log(`   cd frontend && npm run build`);
    console.log(`   Expected path: ${frontendPath}`);
}

// ✅ CLERK MIDDLEWARE - Only for API routes
app.use("/api", clerkMiddleware());

// ✅ PROTECTED API ROUTES
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/comments", commentRoute);

// ✅ CATCH-ALL ROUTE - Serve index.html for SPA
app.get('/{*any}', (req: Request, res: Response) => {
    // Skip API routes
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: "API endpoint not found" });
    }

    // Serve index.html for all other routes
    const indexPath = path.join(frontendPath, "index.html");
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).json({
            error: "Frontend not found. Please build the frontend.",
            path: frontendPath
        });
    }
});

app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on: http://localhost:${ENV.PORT}`);
    console.log(`📡 API health: http://localhost:${ENV.PORT}/api/health`);
    console.log(`🌐 Frontend: http://localhost:${ENV.PORT}`);
    console.log(`📁 Frontend path: ${frontendPath}`);
});