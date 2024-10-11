import {
  main_default
} from "./chunk-IHFCFBCB.mjs";
import "./chunk-TGX4ASNN.mjs";
import "./chunk-CHPSDFKZ.mjs";
import "./chunk-XFSNZKIK.mjs";
import "./chunk-ZV5LXWBW.mjs";
import "./chunk-ZKXYW5IQ.mjs";
import "./chunk-JRRQJLFO.mjs";
import "./chunk-FEIVDKMZ.mjs";
import "./chunk-MENTVLAB.mjs";
import "./chunk-YSYVUHV6.mjs";
import "./chunk-P72YFAUO.mjs";
import "./chunk-UATPMOF3.mjs";
import "./chunk-5VOB44NX.mjs";
import "./chunk-7Y4UEZ4W.mjs";
import "./chunk-LZGUUL5G.mjs";
import "./chunk-AXPE7MNO.mjs";
import "./chunk-NTLMSRR5.mjs";
import "./chunk-6DFRIVLO.mjs";
import "./chunk-RXPRJML7.mjs";
import "./chunk-6RS5JFHU.mjs";
import "./chunk-DJ4S4SRV.mjs";
import "./chunk-4C7UQITC.mjs";

// src/server.ts
import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
var swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Banking API",
      version: "1.0.0",
      description: "API para transa\xE7\xF5es banc\xE1rias"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./src/routes/*.ts"]
};
var swaggerDocs = swaggerJsDoc(swaggerOptions);
var app = express();
app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(main_default);
app.listen(process.env.PORT || 3e3, () => {
  console.log(`Server is running on port ${process.env.PORT || 3e3}`);
});
