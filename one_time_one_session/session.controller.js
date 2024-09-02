const activeSessions = require("./active_sessions.json");
const fs = require("fs");

const CreateSession = async (req, res) => {
    try {
        const { email } = req.body;

        const userSession = activeSessions.find((session) => session.email === email);

        if (userSession) {
            return res.status(400).json({
                message: "User is already logged in",
            });
        }

        const updatedSessions = [...activeSessions, { 
            email,
            session_created: (new Date()).toISOString()
        } ];

        fs.writeFileSync("./one_time_one_session/active_sessions.json", JSON.stringify(updatedSessions, null , 4));

        return res.status(200).json({
            message: "Session created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const DeleteSession = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            })
        }

        const updatedSessions = activeSessions.filter((session) => session.email !== email);

        fs.writeFileSync("./one_time_one_session/active_sessions.json", JSON.stringify(updatedSessions, null, 4));

        return res.status(200).json({
            message: "Session deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const GetActiveSessions = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            })
        }

        const userSessions = activeSessions.filter((session) => session.email === email);

        return res.status(200).json(userSessions);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
}

module.exports = { CreateSession, DeleteSession, GetActiveSessions };