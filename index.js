"use strict";

const express = require("express");
const serveStatic = require("serve-static");

console.log("listening on port 8080");

const app = express()
	.use(serveStatic("."))
	.listen(8080);
