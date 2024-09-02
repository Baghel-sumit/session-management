/* 

Steps to create one time multiple sessions

    1. User will login
    2. User will create an session, we'll store that session in file
    3. User will logout, we'll remove that session from file
    4. If user tries to login again, we'll check if that session is stored in file
        - If it is, we'll throw error that user is already logged in
        - If it is not, we'll redirect user to login page
    5. we'll provide one more end point to get active session of user

*/

const express = require("express");

const loginMiddleware = require("../login.middleware");

const { CreateSession, DeleteSession, GetActiveSessions } = require("./session.controller");

const router = express.Router();

router.route("/login").post(loginMiddleware.Login, CreateSession);

router.route("/logout").post(DeleteSession);

router.route("/active-sessions").get(GetActiveSessions);

module.exports = router;