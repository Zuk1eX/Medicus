require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const compression = require("compression");
const https = require("https");
const fs = require("fs");
const path = require("path");

const router = require("./router");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        credentials: true,
        origin: [
            process.env.CLIENT_URL,
            /http:\/\/192\.168\.1\.[0-9]+:8080/,
            "https://zuk1ex.github.io/medicus",
        ],
    })
);
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get("/csrf", (req, res) => {
    return res.json({ csrfToken: req.csrfToken() });
});

app.get(
    "/.well-known/acme-challenge/FTevZMeDjCIZTxhFnKeWVAWe0Y-zYxJbSAbItAqFq3Y",
    (req, res) => {
        return res.send(
            "eTNbgkVLvJ3VA_qTfy2XwzosLwTWLRZeGB9ZrydJwn8.ITvGWj2FpwE9743J_bq33Rc2cJBi6sQ6p9UkGA-F-Eg"
        );
    }
);

app.use("/api", router);
app.use(errorMiddleware);

const httpsServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
    },
    app
);

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedtopology: true,
            dbName: "medicus",
        });
        app.listen(PORT, () => {
            console.log(`Server has been started http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
