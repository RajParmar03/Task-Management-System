const CONFIG = {
    PORT : process.env.PORT || 8080,
    DATABASEURL : process.env.DATABASEURL || "",
    SALT : process.env.SALT || 5,
    JWTKEY : process.env.JWTKEY || "taskmanagement",
}

module.exports = CONFIG;
