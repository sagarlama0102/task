const express = require("express");
const userController = require('../controller/users/userController');
const router = express.Router();

router.post("/",userController.create);
router.put("/:id", userController.update);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

module.exports=router;
