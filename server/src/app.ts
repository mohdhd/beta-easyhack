import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import compression from "compression";  // compresses requests
import cors from "cors";
import helmet from "helmet";
import router from "./routes";
import passport from "passport";
import { User } from "./models/user.model";
import { CTF } from './models/ctf.model';
import { errorHandler } from "./middlewares/handlers";
import "./config/passport";
import bcrypt from 'bcryptjs';

const app = express();

// create a default super user
User.findOne({ username: 'admin' }).then(async (res) => {
    if (!res) {
        await User.create({
            username: 'admin',
            password: bcrypt.hashSync('admin@Pass331', 8),
            email: 'admin@easyhackctf.com',
            active:true,
            isAdmin: true,
        });
    }
    });

// create a default ctf record
CTF.find().then((async (res) => {
    if (res.length === 0) {
        await CTF.create({
            version: '1.0',
            about: 'some text',
        });
    }
}));
app.set('view engine', 'ejs');
app.use(errorHandler);
app.use(passport.initialize());
app.use(morgan("common"));
app.use(compression());
app.use(cors());
// provide extra security features
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/static", express.static("static"));

app.use("/api", router);

export default app;
