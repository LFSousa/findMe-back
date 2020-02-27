module.exports = {
    PORT : process.env.PORT || 3000,
    DB: {
        HOST: process.env.DB_HOST || "",
        PORT: process.env.DB_PORT || "3306",
        NAME: process.env.DB_NAME || "findme",
        USER: process.env.DB_USER || "root",
        PASS: process.env.DB_PASS || ""
    }
}