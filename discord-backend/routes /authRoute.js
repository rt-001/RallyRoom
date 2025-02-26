const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/authController");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middlewares/auth");
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});
const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});
router.post(
  "/register",
  validator.body(registerSchema),
  authController.controllers.postRegister
);
router.post(
  "/login",
  validator.body(loginSchema),
  authController.controllers.postLogin
);
router.get("/test", auth, (req, res) => {
  res.send("request passed");
});
module.exports = router;
