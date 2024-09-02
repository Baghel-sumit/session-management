const express = require("express");
const morgan = require("morgan");
const oneTimeOneSession = require("./one_time_one_session");
const expressListRoutes = require("express-list-endpoints");
const app = express();

app.use(morgan("dev")); // log every request to the console

app.use(express.json()); // for parsing application/json


app.use("/one-time-one-session", oneTimeOneSession);


const server = app.listen(3000, () => {
    console.log("Server is running on port 3000\n");

    const allRoutes = expressListRoutes(app);

    const { address, port } = server.address();

    const baseUrl = `${address === '::' ? 'http://localhost' : `https://${address}`}:${port}`;

    allRoutes.forEach(({ path, methods = [] }) => {
        methods.forEach((method) => {
            console.log("\x1b[33m%s\x1b[0m", `\t ${method} | ${baseUrl}${path}`, "\n"); // just log the available paths in yellow color
        });
    });
});