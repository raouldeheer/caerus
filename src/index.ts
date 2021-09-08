import express from "express";
import fetch from "node-fetch";

const app = express();

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", async function (req, res) {
    const total = "https://" + req.query.caerusUrl;
    console.log(total);
    const data = await fetch(total);
    const dataBody = await data.json();

    res.status(data.status);
    data.headers.forEach((v, k) => { res.setHeader(k, v); });
    res.json(dataBody).end();
});

app.listen(8080, () => {
    console.log("listing on 8080");
});
