import express from "express";
import fetch from "node-fetch";
import ip from "ip";
import morgan from "morgan";
import dotenv from "dotenv";
import { pipeline } from "stream/promises";
dotenv.config();

const port = Number(process.env.PORT) || 4862;

express()
    .use(express.urlencoded({ extended: true }))
    .use(morgan("common"))
    .get("/", async (req, res) => {
        if (!req.query.caerusUrl) {
            res.sendStatus(412);
            return;
        }
        const target = String(req.query.caerusUrl);
        if (!RegExp(/[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/ig)
            .test(target)) {
            res.sendStatus(412);
            return;
        }

        const data = await fetch("https://" + target);
        res.status(data.status);
        if (data.body) await pipeline(data.body, res);
        res.end();
    })
    .listen(port, ip.address(), () => {
        console.log(`listing on http://${ip.address()}:${port}/`);
    });
