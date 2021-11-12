const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");

const MongoDBStore = require("connect-mongo")(session);
dbUrl = "mongodb://127.0.0.1:27017/Navy";

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize({
    replaceWith: "_"
}));

const secret = process.env.SECRET || "thisshouldbeabettersecret!";

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
});

app.get("/", (req, res) => {
	res.render("home");
});

app.listen(8080, () => {
    console.log("Listening in port 3000");
});