import { Application } from "express";
/*import { errorHandler } from "./errors"; 
import { usersRouter } from "./routes/users.routes";
import { categoriesRouter } from "./routes/categories.routes";
import { realEstateRouter } from "./routes/realEstate.routes";
import { schedulesRouter } from "./routes/schedules.routes"; */

const exprees = require("express");
const app: Application = exprees();

app.use(exprees.json());

/* app.use(errorHandler);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/realEstate", realEstateRouter);
app.use("/schedules", schedulesRouter); */

export default app;
