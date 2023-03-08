import { Application } from "express";
import { loginController } from "./controllers";
import { errorHandler } from "./errors";
import { validateBodyMiddleware } from "./middlewares";
import { usersRouter } from "./routes";
import { loginSchema } from "./schemas";
import { categoriesRouter } from "./routes/category.routes";
import { realEstateRouter } from "./routes/realEstate.routes";
/* import { schedulesRouter } from "./routes/schedules.routes"; */

const express = require("express");
const app: Application = express();

app.use(express.json());

app.post("/login", validateBodyMiddleware(loginSchema), loginController);

app.use("/users", usersRouter);

app.use("/categories", categoriesRouter);
app.use("/realEstate", realEstateRouter);
// app.use("/schedules", schedulesRouter);

app.use(errorHandler);

export default app;
