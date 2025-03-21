import { Router } from "express";
import { authorizationController } from "../controllers/authorization-controller.js";
import { usersController } from "../controllers/users-controller.js";

const router = new Router();

router.get("/users", usersController("getUsers"));
router.post("/delete", usersController("deleteUsers"));
router.post("/banned", usersController("bannedUsers"));
router.post("/unbanned", usersController("unbannedUsers"));
router.post("/login", authorizationController("login"));
router.post("/signup", authorizationController("signup"));

export default router;
