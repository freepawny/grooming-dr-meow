const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = 3000;
const SRC_DIR = path.join(__dirname, "src");

const MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
};

function sendJson(res, status, payload) {
    res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(payload));
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
            if (data.length > 100000) {
                reject(new Error("Payload too large"));
                req.destroy();
            }
        });
        req.on("end", () => resolve(data));
        req.on("error", reject);
    });
}

async function createBooking(req, res) {
    const raw = await readBody(req);

    let input;
    try {
        input = JSON.parse(raw || "{}");
    } catch (err) {
        return sendJson(res, 400, { success: false, error: "Body harus berupa JSON yang valid" });
    }

    const required = ["customerName", "customerPhone", "service", "bookingDate", "bookingTime", "catName", "arrivalMethod"];
    const missing = required.filter((key) => !String(input[key] || "").trim());

    if (missing.length > 0) {
        return sendJson(res, 400, { success: false, error: "Field wajib diisi: " + missing.join(", ") });
    }

    if (input.arrivalMethod === "Antar-Jemput" && !String(input.pickupAddress || "").trim()) {
        return sendJson(res, 400, { success: false, error: "pickupAddress wajib diisi untuk metode Antar-Jemput" });
    }

    const booking = {
        id: "BK-" + Date.now().toString(36).toUpperCase(),
        createdAt: new Date().toISOString(),
        customerName: String(input.customerName).trim(),
        customerPhone: String(input.customerPhone).trim(),
        service: String(input.service).trim(),
        bookingDate: String(input.bookingDate).trim(),
        bookingTime: String(input.bookingTime).trim(),
        catName: String(input.catName).trim(),
        arrivalMethod: String(input.arrivalMethod).trim(),
        pickupAddress: String(input.pickupAddress || "").trim(),
    };

    const file = path.join(__dirname, "data", "bookings.json");
    const list = JSON.parse(fs.readFileSync(file, "utf8"));
    list.push(booking);
    fs.writeFileSync(file, JSON.stringify(list, null, 4));

    return sendJson(res, 201, { success: true, data: booking });
}

const server = http.createServer(async (req, res) => {
    try {
        const url = new URL(req.url, "http://localhost");

        /* --- API --- */
        if (url.pathname.startsWith("/api/")) {

            if (url.pathname === "/api/bookings") {
                if (req.method === "GET") {
                    const file = path.join(__dirname, "data", "bookings.json");
                    const data = JSON.parse(fs.readFileSync(file, "utf8"));
                    return sendJson(res, 200, { success: true, data });
                }
                if (req.method === "POST") {
                    return await createBooking(req, res);
                }
                return sendJson(res, 405, { success: false, error: "Method not allowed" });
            }

            if (req.method !== "GET") {
                return sendJson(res, 405, { success: false, error: "Method not allowed" });
            }
            if (url.pathname === "/api/health") {
                return sendJson(res, 200, { success: true, data: "ok" });
            }

            if (url.pathname === "/api/services") {
                const file = path.join(__dirname, "data", "services.json");
                const data = JSON.parse(fs.readFileSync(file, "utf8"));
                return sendJson(res, 200, { success: true, data });
            }
            return sendJson(res, 404, { success: false, error: "Not found" });
        }

        if (req.method !== "GET" && req.method !== "HEAD") {
            return sendJson(res, 405, { success: false, error: "Method not allowed" });
        }

        /* --- FILE WEBSITE --- */
        const filePath = url.pathname === "/"
            ? path.join(SRC_DIR, "app", "index.html")
            : path.join(SRC_DIR, url.pathname);

        if (!filePath.startsWith(SRC_DIR + path.sep)) {
            return sendJson(res, 403, { success: false, error: "Forbidden" });
        }

        const data = fs.readFileSync(filePath);
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(data);

    } catch (err) {
        if (err.code === "ENOENT") {
            return sendJson(res, 404, { success: false, error: "File not found" });
        }
        console.error(err);
        sendJson(res, 500, { success: false, error: "Internal server error" });
    }
});

server.listen(PORT, () => console.log("Server berjalan di http://localhost:" + PORT));