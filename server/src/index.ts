import express, { Router, Request, Response, NextFunction } from "express";
import session from "express-session";
import path from "path";
import cors from "cors";
import apiRouter from './routes/api-routes';
import userRouter from './routes/user.routes';
import dotenv from "dotenv";
import { connectDB } from "./config/db";

const app = express();

dotenv.config();
connectDB();

// 🔐 Session setup
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      maxAge: 1000 * 60 * 30, // 30 mins
    },
  })
);

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.DB_PORT', process.env.DB_URL);

// registers common middlewares
app.use(cors());
app.use(express.json());

function logger(req: Request, res: Response, next: NextFunction){
    console.log("Incoming request: logger fn", req.ip, req.method, req.url, req.headers);
    next();
}

app.use(logger);

/* route module */

app.use("/users", userRouter);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Node + TypeScript server running");
});

/* path params*/

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/dashboard", (req, res) => {
  res.redirect("/login");
});

app.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "files", "report.pdf");

  res.download(filePath, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).send("File not found");
    }
  });
});

/* search params */

app.get("/search", (req, res) => {
  res.send(req.query);
});

/* post requests */

function auth(req: Request, res: Response, next: NextFunction) {
    console.log('** Authenticating route ', req.url);
    next();
}

app.post("/admin", auth,(req, res) => {
    res.send("Admin panel");
});

/* regex route */ 
app.get(/^\/user\/(\d+)$/, (req, res) => {
    res.send("User with numeric ID");
});

/* multiple routes */
app.get(["/home", "/about"], (req, res) => {
      console.log('process ', process.env.DB_PORT)

    res.send("Home or About");
});

/* route chaining */
app.route("/animal")
  .post((req, res) => res.send("Create user"))
  .put((req, res) => res.send("Update user"))
  .get((req, res) => res.send("Get users"));


/* matches any path and sends 404 */

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});