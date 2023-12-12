const express = require("express");
const router = express();

const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser,
} = require("../controllers/userController");

router.post("/create-user", createUser);
router.get("/get-users", getAllUsers);
router.get("/get-user/:id", getSingleUser);
router.put("/edit-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
