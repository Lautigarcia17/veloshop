import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { authToken } from "../middlewares/authToken.middleware";


const router = Router();


router.post('/login', validateSchema(loginSchema), AuthController.login)
router.post('/register', validateSchema(registerSchema), AuthController.register);
router.post('/logout', authToken ,AuthController.logout);
router.get("/verify", AuthController.verifyToken);


export default router;