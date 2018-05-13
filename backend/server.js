var express = require("express");
var path = require("path");
var mongojs = require("mongojs");
var db = mongojs("taskslist", ["taskslist"]);
var bodyParser = require("body-parser");
var httpProxy = require("http-proxy");

var proxy = httpProxy.createProxyServer();
var app = express();

var isProduction = process.env.NODE_ENV === "production";
var host = process.env.APP_HOST || "localhost";
var port = isProduction ? 8080 : 3000;
var publicPath = path.resolve(__dirname, "..", "public");

if (!isProduction) {
    // Any requests to localhost:3000/assets is proxied
    // to webpack-dev-server
    app.all(["/assets/*", "*.hot-update.json"], function (req, res) {
        proxy.web(req, res, {
            target: "http://" + host + ":3001"
        });
    });
}

app.use(express.static(publicPath));
app.use(bodyParser.json());


app.get("/taskslist", function (req, res) {
    db.taskslist.find(function (err, doc) {
        res.json(doc);
    });
});

app.post("/taskslist", function (req, res) {
    db.taskslist.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

app.delete("/taskslist/:id", function (req, res) {
    var id = req.params.id;
    db.taskslist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

proxy.on("error", function (e) {
    console.log("Could not connect to proxy, please try again... " + e);
});

app.listen(port, function () {
    console.log("Server launched on port " + port);
});