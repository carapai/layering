require("dotenv").config();
const axios = require("axios");
const schedule = require("node-schedule");

const { DHIS2_URL, DHIS2_USERNAME, DHIS2_PASSWORD } = process.env;

const api = axios.create({
    baseURL: "http://localhost:3001",
});

const job = schedule.scheduleJob("42 * * * *", function () {
    console.log("The answer to life, the universe, and everything!");
});
