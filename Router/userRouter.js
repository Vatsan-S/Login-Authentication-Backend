import express from "express";
import { forgotpassword, login, register, resetpassword, updatepassword } from "../Controller/userController.js";
import transporter from "../Service/nodemailer.js";


const router = express.Router();

router.post("/registeruser",register)
router.post("/loginuser",login)
router.post('/forgot_password',forgotpassword)
router.post("/reset_password",resetpassword)
router.post("/update_password",updatepassword)



export default router