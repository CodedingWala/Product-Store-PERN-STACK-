// backend/src/lib/corn.ts
import cron from "node-cron";
import http from "http"; // ✅ Use http instead of https
import https from "https"; // Keep for potential HTTPS URLs
import { ENV } from "../config/env.js";

const job = cron.schedule("*/14 * * * *", () => {
    const url = `${ENV.FRONTEND_URL}/api/health`;
    console.log(`🔄 Pinging: ${url} at ${new Date().toISOString()}`);
    
    // ✅ Use the appropriate protocol based on the URL
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
        console.log(`✅ Pinged API: ${res.statusCode} at ${new Date().toISOString()}`);
        res.resume(); // Consume response data to free up memory
    }).on('error', (err) => {
        console.error('❌ Cron job error:', err.message);
    });
});

export default job;

console.log("✅ Cron job scheduled to run every 14 minutes");