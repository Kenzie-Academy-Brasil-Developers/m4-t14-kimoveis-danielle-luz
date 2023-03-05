import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    const apiPort = parseInt(process.env.PORT + "");
    app.listen(apiPort, () => {
      console.log("API is running in port " + apiPort);
    });
  })
  .catch((error: Error) => {
    console.error(error.stack);
  });
