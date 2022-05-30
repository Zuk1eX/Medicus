require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { randomBytes } = require("crypto");
const csrf = require("csurf");

const router = require("./router");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        credentials: true,
        origin: [process.env.CLIENT_URL, /http:\/\/192\.168\.1\.[0-9]+:8080/],
    })
);
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get("/csrf", (req, res) => {
    return res.json({ csrfToken: req.csrfToken() });
});

app.use("/api", router);
app.use(errorMiddleware);

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedtopology: true,
        });
        app.listen(PORT, () => {
            console.log(`Server has been started http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
