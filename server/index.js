require("dotenv").config();
const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const compression = require("compression");

const router = require("./router");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.NODE_ENV === "production" ? process.env.REMOTE_DB_URI : process.env.DB_URI;
const ORIGIN_URL = process.env.NODE_ENV === "production" ? "https://zuk1ex.github.io" : process.env.CLIENT_URL;

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        credentials: true,
        origin: ORIGIN_URL,
    })
);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use(cookieParser());
app.use(
    csrf({
        cookie: {
            sameSite: "none",
            secure: true,
        },
    })
);

app.get("/csrf", (req, res) => {
    return res.json({ csrfToken: req.csrfToken() });
});

app.post('/test', (req, res) => {
    console.log(req.body);
    return res.json({});
});

app.use("/api", router);
app.use(errorMiddleware);

async function start() {
    try {
        await connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedtopology: true,
            dbName: "medicus",
        });
        app.listen(PORT, () => {
            console.log(`Server has been started on http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
