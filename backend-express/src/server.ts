import "reflect-metadata";
import express from 'express';
import './database';
import { routes } from "./routes";
import { HttpLogs } from "./middlewares/status";

const app  = express();

app.use(HttpLogs)


app.use(express.json());
app.use(routes)

app.listen(3000, () => {
    console.log("Servidor Rodando")
});