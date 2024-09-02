const fs = require("fs");

const CreateSession = async (req, res) => {
    try {
        const { email } = req.body;

        const data = fs.readFileSync("./one_time_multiple_sessions/active_sessions.json", 'utf8');
        const activeSessions = JSON.parse(data);

        const createdSession = { 
            email,
            session_created: (new Date()).toISOString()
        };

        const updatedSessions = [...activeSessions, createdSession ];

        fs.writeFileSync("./one_time_multiple_sessions/active_sessions.json", JSON.stringify(updatedSessions, null , 4));

        return res.status(200).json({
            message: "Session created successfully",
            session: createdSession
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
        const { email, session_creation_date } = req.body;

        if (!email || !session_creation_date) {
            return res.status(400).json({
                message: "Email and session creation date are required",
            })
        }

        const data = fs.readFileSync("./one_time_multiple_sessions/active_sessions.json", 'utf8');
        const activeSessions = JSON.parse(data);

        const availableSessionIndex = activeSessions.findIndex((session) => (
            session.email === email 
            && new Date(session.created_at).toISOString() === new Date(session_creation_date).toISOString()
        ));

        if (availableSessionIndex === -1) {
            return res.status(400).json({
                message: "Session not found"
            })
        }

        activeSessions.splice(availableSessionIndex, 1);

        fs.writeFileSync("./one_time_multiple_sessions/active_sessions.json", JSON.stringify(activeSessions, null, 4));

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

        const data = fs.readFileSync("./one_time_multiple_sessions/active_sessions.json", 'utf8');
        const activeSessions = JSON.parse(data);

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