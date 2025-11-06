import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import jaideepRoutes from "./routes/jaideep_routes.js";
import jkpaperRoutes from "./routes/jkpaper_routes.js";
import welspunRoutes from "./routes/welspun_routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes for each project
app.use("/api/jaideep", jaideepRoutes);
app.use("/api/jkpaper", jkpaperRoutes);
app.use("/api/welspun", welspunRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// global.appurl = "http://localhost:3000";
// global.PROJECT_DIR = __dirname;
// let iron_mq = require("iron_mq");

// require("rootpath")();
// var createError = require("http-errors");
// var express = require("express");
// var session = require('express-session');
// var xFrameOptions = require('x-frame-options');
// const csp = require('express-csp-header');
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var pg = require("pg");
// var bodyParser = require('body-parser');
// require("./utility/picklistUtility");
// require("dotenv").config();
// require("./utility/constant");
// const jwt = require("_helpers/jwt");
// var logger = require("morgan");
// var cors=require('cors')
// // const {cronjob} = require("./utility/cornJob");
// // const {sauda_overdue} = require("./utility/cornJob");
// // const {update_overdue} = require("./utility/cornJob");
// // const {insert_open_sauda} = require("./utility/cornJob");

// /** CRYPTO CONFIG*/
// global.cryptoJSON = require('crypto-json');
// global.algorithm = 'camellia-128-cbc'
// global.encoding = 'hex'
// global.encrypt_password = process.env.ENCRYPT_PASSWORD;
// /** CRYPTO */

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


// global.client = {};
// try {
//   global.client = new pg.Client(`${process.env.DATABASE_URL}?ssl=true`);
//   client.connect();
// } catch (e) {
//   console.log(`ERROR::: app.js >>> 14 >>> err `, e);
// }

// global.client_queue = {};
// try {
//   global.client_queue = {};
//   global.client_queue = new iron_mq.Client({"queue_name": "approveOrderQueue","token":"qEBIhpVZTARrj61gquL2","project_id":"62c3039a583df5000c391a54","host":"mq-aws-eu-west-1-1.iron.io"});
// } catch (e) {
//   console.log(`ERROR::: app.js >>> 14 >>> err `, e);
// }

// var app = express();

// // view engine setup
// // app.set("views", path.join(__dirname, "views"));
// // app.set("view engine", "ejs");
// app.use(bodyParser.json({ limit: '6mb' }))
// app.use(cors())
// app.use(xFrameOptions());
// app.use(csp({
//   policies: {
//     'default-src': [csp.SELF],
//     'script-src': [csp.SELF, csp.INLINE, 'zoxima-cns.herokuapp.com'],
//     'style-src': [csp.SELF, 'zoxima-cns.herokuapp.com'],
//     'img-src': ['data:', 'zoxima-cns.herokuapp.com'],
//     'worker-src': [csp.NONE],
//     'block-all-mixed-content': true
//   }
// }));

// app.use(bodyParser.json())

// app.use(logger("dev"));
// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: false
//   })
// );
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'GHFHSGAVNBA6735e673HJGDSHDJHasdasd',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// // app.use(cors());
// // app.use(jwt());


// var http = require('http');
// var port = process.env.PORT || '3000';
// app.set('port', port);

// var server = http.createServer(app);
// require("./router")(app);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send("error");
// });

// server.listen(port);

// module.exports = app;
