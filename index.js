const express = require("express");

const app = express();
const port = 3000;

const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// Setup body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

// Setup cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser("userinfoo"));

// Setup express-session
const session = require("express-session");
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "userinfoo"
}));

// make public available statically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));



// Setup routes
const loginRouter = require("./routes/user-manager-routers.js");
app.use(loginRouter);
const homeRouter = require("./routes/home-routers.js");
app.use(homeRouter);
const postRouter = require("./routes/post-manager-routers.js");
app.use(postRouter);
const fulltextRouter = require("./routes/fulltext-routers.js");
app.use(fulltextRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});