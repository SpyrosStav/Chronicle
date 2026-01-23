import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes/index.js";
import sequelize from "./config/db.js";
// import { errorHandler } from "./middleware/errorHandler.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600 * 1000 },
    })
);

// Static files
app.use("/static", express.static(path.join(__dirname, "static")));

// Routes
app.use(routes);

// Serve frontend in production
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
// });

// Global error handler (optional)
// app.use(errorHandler);

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("DB Connected & Models Synced!");
    } catch (err) {
        console.error("DB Error:", err);
    }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});

export default app;