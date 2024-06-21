import express from "express";

import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import searcHRouter from "./routes/search.js";
import uploadRouter from "./routes/upload.js";
import commentRouter from "./routes/comments.js";
import likesRouter from "./routes/likes.js";
import friendshipRouter from "./routes/friendship.js";

const app = express();

//Fazendo o app entender o formato json das respostas vindas do controller
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://next-my-sql-sigma.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permite pedidos sem origem (como aplicações móveis ou servidores internos)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, //Esta opção indica se a requisição pode incluir cookies, autorizações HTTP ou certificados TLS. Quando configurada como true, o servidor aceita e envia cookies com as requisições.
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
};

/*Esta opção define quais cabeçalhos HTTP podem ser usados quando a solicitação é feita. No caso, os cabeçalhos permitidos são:

Content-Type: Define o tipo de mídia do recurso.
Authorization: Usado para enviar informações de autenticação.
Access-Control-Allow-Credentials: Indica se a resposta pode ser exposta ao navegador e se o navegador deve enviar credenciais como cookies junto com a requisição.*/

//Middleware
app.use(bodyParser.urlencoded({ extended: false })); //Recebendo os dados pelo método x-www-form-urlencoded do postman
app.use(cors(corsOptions)); //crediantals: true = o servidor pode enviar e receber cookies e cabeçalhos de autenticação.
app.use(cookieParser());
app.use("/api/users/", userRouter);
app.use("/api/auth/", authRouter);
app.use("/api/post/", postRouter);
app.use("/api/upload/", uploadRouter);
app.use("/api/comments/", commentRouter);
app.use("/api/likes/", likesRouter);
app.use("/api/friendship/", friendshipRouter);
app.use("/api/search/", searcHRouter);

const portS = process.env.PORTS;
app.listen(portS, () => {
  console.log("Servidor rodando para a porta 8001");
});
