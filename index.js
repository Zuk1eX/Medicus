require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const compression = require("compression");

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
        origin:
            // process.env.CLIENT_URL,
            // /http:\/\/192\.168\.1\.[0-9]+:8080/,
            "https://zuk1ex.github.io",
    })
);
app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "https://zuk1ex.github.io/medicus");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
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
