import { Router } from "express";
import { RegisterControllers } from "./controllers/register/RegisterController";

const routes = Router();

routes.post("/register", new RegisterControllers().CreateController)
routes.get("/register", new RegisterControllers().GetAllController)
routes.get("/register/:id", new RegisterControllers().GetOneController)
routes.delete("/register/:id", new RegisterControllers().DeleteController)
routes.put("/register/:id", new RegisterControllers().UpdateController)



export {routes}