import express from "express";
import { get, RequestOptions } from "http";
import { networkInterfaces } from "os";

const app = express();

app.get("/ifaces", (req, res) => {
  res.send(networkInterfaces());
});

app.get("/myip", (req, res) => {
  const localAddr = req.query.localAddr;
  var opts = {} as RequestOptions;
  if (typeof localAddr === "string" && localAddr !== "") {
    opts.localAddress = localAddr;
  }

  get("http://whatismyip.akamai.com", opts, (r) => {
    var data = "";

    r.on("data", (chunk) => {
      data += chunk;
    });

    r.on("end", () => {
      res.send(data);
    });

    r.on("error", (e) => {
      res.send(e);
    });
  })
    .on("error", (e) => {
      res.send(e);
    });
});

app.listen(3000);
