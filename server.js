const express = require("express");
const fs = require("node:fs");
const path = require("node:path");

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, "data");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function sendJson(res, status, payload) {
    res.status(status).json(payload);
}

function readJsonFile(filename) {
    const file = path.join(DATA_DIR, filename);
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJsonFile(filename, data) {
    const file = path.join(DATA_DIR, filename);
    fs.writeFileSync(file, JSON.stringify(data, null, 4));
}

app.get("/api/health", (req, res) => {
    sendJson(res, 200, { success: true, data: "ok" });
});

app.get("/api/services", (req, res) => {    
    const data = readJsonFile("services.json");
    sendJson(res, 200, { success: true, data });
});

app.get("/api/bookings", (req, res) => {
    const data = readJsonFile("bookings.json");
    sendJson(res, 200, { success: true, data });
});

app.post("/api/bookings", (req, res) => {
    const input = req.body || {};

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

    const list = readJsonFile("bookings.json");
    list.push(booking);
    writeJsonFile("bookings.json", list);

    sendJson(res, 201, { success: true, data: booking });
});

// 404 handler for API routes only
app.use("/api/*", (req, res) => {
    sendJson(res, 404, { success: false, error: "API endpoint not found" });
});

app.listen(PORT, () => console.log("Server berjalan di http://localhost:" + PORT));