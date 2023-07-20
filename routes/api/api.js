const express = require("express");

const {
  getTasks,
  createTask,
  deleteTask,
  completeTask,
  editTask,
  revertTask,
  deleteAllTasks,
  deleteCompletedTasks
} = require("../../controller/taskController");

const {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  newMember,
  getAdmin,
  getVisitor
} = require("../../controller/adminController");

const {
  getHistory,
} = require("../../controller/historyController");

const router = express.Router();

// History
router
  .route("/history/getHistory")
  .post(getHistory)

// Task
router
  .route("/tasks/getTasks")
  .post(getTasks)

router
  .route("/tasks/newTask")
  .post(createTask)

router
  .route("/tasks/editTask")
  .put(editTask)

router
  .route("/tasks/deleteTask")
  .put(deleteTask);

router
  .route("/tasks/completeTask")
  .put(completeTask);

router
  .route("/tasks/revertTask")
  .put(revertTask);

router
  .route("/tasks/deleteAllTasks")
  .put(deleteAllTasks);

router
  .route("/tasks/deleteCompletedTasks")
  .put(deleteCompletedTasks);

// Admin
router
  .route("/admin")
  .get(getAllAdmins)
  .put(updateAdmin)
  .delete(deleteAdmin);

router
  .route("/admin/newAdmin")
  .post(createAdmin)

router
  .route("/admin/newMember")
  .put(newMember)

router
  .route("/login/getAdmin")
  .post(getAdmin)

router
  .route("/login/getVisitor")
  .post(getVisitor)


module.exports = router;
