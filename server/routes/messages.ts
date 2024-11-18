import { Router } from "npm:express";
import { addMessage, getMessages } from "../controllers/messageController.ts";

const router = Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

export default router;