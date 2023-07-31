const History = require("../model/Histories");
const Admin = require("../model/Admins");

// @desc - all tasks
// @route - GET '/'
// @access - public
const getTasks = async (req, res) => {
  const { adminId } = req?.body;

  try {
    const admin = await Admin.findOne({ _id: adminId });

    if (!admin) return res.status(204).json({ message: "No admin found" });

    const tasks = [];
    admin?.tasks?.map((task) => {
      if (!task?.isDeleted) {
        tasks.push({
          title: task?.title,
          description: task?.description,
          members: task?.members,
          isCompleted: task?.isCompleted,
          isEdited: task?.isEdited,
          isDeleted: task?.isDeleted,
          taskId: task?._id.toString(),
        });
      }
    });

    res.json(tasks);
  } catch (err) {
    console.log(err);
  }
};

// @desc - create a task
// @route - POST '/'
// @access - public
const createTask = async (req, res) => {
  const { adminId } = req?.body;

  if (!adminId) return res.status(400).json({ message: "adminId is required" });

  try {
    const admin = await Admin.findOne({ _id: adminId });

    const historyObj = new History({
      title: req?.body?.title,
      type: "create",
      date: new Date().toLocaleString(),
      adminId: adminId,
      members: [
        {
          fullName: admin?.fullName,
          age: admin?.age,
          email: admin?.email,
        },
      ],
    });

    await historyObj.save();

    admin?.tasks?.push(req?.body);

    const task = await admin.save();

    const tasksArray = task?.tasks
      ?.map((task) => {
        if (!task?.isDeleted) {
          return {
            title: task?.title,
            description: task?.title,
            members: task?.members,
            isCompleted: false,
            isEdited: false,
            isDeleted: false,
            taskId: task?._id.toString(),
          };
        }
      })
      .filter(Boolean);

    res.json(tasksArray);
  } catch (err) {
    console.log(err);
  }
};

// @desc - edit a task
// @route - PUT '/'
// @access - public
const editTask = async (req, res) => {
  const editedTask = req?.body;
  if (!editedTask?.adminId)
    return res.status(400).json({ message: "adminId parameter is required" });

  try {
    const admin = await Admin.findOne({ _id: editedTask?.adminId });
    if (!admin)
      return res
        .status(204)
        .json({ message: `No matches admin with id:${editedTask?.adminId}` });

    const historyObj = new History({
      title: req?.body?.title,
      type: "edit",
      date: new Date().toLocaleString(),
      adminId: editedTask?.adminId,
      members: [
        {
          fullName: admin?.fullName,
          age: admin?.age,
          email: admin?.email,
        },
      ],
    });

    await historyObj.save();

    admin?.tasks?.forEach((oldTask) => {
      if (oldTask?._id?.toString() === editedTask?.taskId) {
        oldTask.title = editedTask?.title;
        oldTask.description = editedTask?.description;
        oldTask.isEdited = editedTask?.isEdited;
        oldTask.members = editedTask?.members;
      }
    });

    const savedAdmin = await admin.save();

    const newTasks = [];
    savedAdmin?.tasks?.map((task) => {
      if (!task?.isDeleted) {
        newTasks.push(
          Object.assign(
            {},
            {
              taskId: task?._id?.toString(),
              title: task?.title,
              description: task?.description,
              isCompleted: task?.isCompleted,
              isDeleted: task?.isDeleted,
              isEdited: task?.isEdited,
              members: task?.members,
            }
          )
        );
      }
    });

    const result = {
      fullName: savedAdmin?.fullName,
      firstName: savedAdmin?.firstName,
      lastName: savedAdmin?.lastName,
      age: savedAdmin?.age,
      email: savedAdmin?.email,
      language: savedAdmin?.language,
      github: savedAdmin?.github,
      linkedIn: savedAdmin?.linkedIn,
      skills: savedAdmin?.skills,
      profilePhoto: savedAdmin?.profilePhoto,
      isAdmin: savedAdmin?.isAdmin,
      members: savedAdmin?.members,
      tasks: newTasks,
      adminId: savedAdmin?._id.toString(),
    };

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

// @desc - complete a task
// @route - PUT '/tasks/completeTask'
// @access - public
const completeTask = async (req, res) => {
  const { adminId, taskId, userId } = req?.body;
  if (!adminId || !taskId)
    return res
      .status(400)
      .json({ message: "adminId and taskId are both required" });

  try {
    const admin = await Admin.findOne({ _id: adminId });
    if (!admin)
      return res
        .status(204)
        .json({ message: `no matches admin with id:${adminId}` });

    const history = [];
    admin?.tasks?.map((task) => {
      if (task?._id?.toString() === taskId) {
        const member = task?.members?.filter(
          (member) => member?.memberId === userId
        );
        history.push({
          title: task?.title,
          type: "complete",
          adminId: adminId,
          date: new Date().toLocaleString(),
          members: member?.length
            ? member
            : [
                {
                  fullName: admin?.fullName,
                  age: admin?.age,
                  email: admin?.email,
                },
              ],
        });
      }
    });

    const historyObj = new History(history[0]);

    await historyObj.save();

    admin?.tasks?.forEach((task) => {
      if (task?._id?.toString() === taskId) task.isCompleted = true;
    });
    const completedTaskAdmin = await admin.save();

    const newTasks = [];
    completedTaskAdmin?.tasks?.map((task) => {
      if (!task?.isDeleted) {
        newTasks.push(
          Object.assign(
            {},
            {
              taskId: task?._id?.toString(),
              title: task?.title,
              description: task?.description,
              isCompleted: task?.isCompleted,
              isDeleted: task?.isDeleted,
              isEdited: task?.isEdited,
              members: task?.members,
            }
          )
        );
      }
    });

    const result = {
      fullName: completedTaskAdmin?.fullName,
      firstName: completedTaskAdmin?.firstName,
      lastName: completedTaskAdmin?.lastName,
      age: completedTaskAdmin?.age,
      email: completedTaskAdmin?.email,
      language: completedTaskAdmin?.language,
      github: completedTaskAdmin?.github,
      linkedIn: completedTaskAdmin?.linkedIn,
      skills: completedTaskAdmin?.skills,
      profilePhoto: completedTaskAdmin?.profilePhoto,
      isAdmin: completedTaskAdmin?.isAdmin,
      members: completedTaskAdmin?.members,
      tasks: newTasks,
      adminId: completedTaskAdmin?._id.toString(),
    };

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

// @desc - revert a task
// @route - PUT '/tasks/revertTask'
// @access - public
const revertTask = async (req, res) => {
  const { adminId, taskId, userId } = req?.body;
  if (!adminId || !taskId)
    return res
      .status(400)
      .json({ message: "adminId and taskId are both required" });

  try {
    const admin = await Admin.findOne({ _id: adminId });
    if (!admin)
      return res
        .status(204)
        .json({ message: `no matches admin with id:${adminId}` });

    const history = [];
    admin?.tasks?.map((task) => {
      if (task?._id?.toString() === taskId) {
        const member = task?.members?.filter(
          (member) => member?.memberId === userId
        );
        history.push({
          title: task?.title,
          type: "revert",
          adminId: adminId,
          date: new Date().toLocaleString(),
          members: member?.length
            ? member
            : [
                {
                  fullName: admin?.fullName,
                  age: admin?.age,
                  email: admin?.email,
                },
              ],
        });
      }
    });

    const historyObj = new History(history[0]);

    await historyObj.save();

    admin?.tasks?.forEach((task) => {
      if (task?._id?.toString() === taskId) task.isCompleted = false;
    });
    const revertedTaskAdmin = await admin.save();

    const newTasks = [];
    revertedTaskAdmin?.tasks?.map((task) => {
      if (!task?.isDeleted) {
        newTasks.push(
          Object.assign(
            {},
            {
              taskId: task?._id?.toString(),
              title: task?.title,
              description: task?.description,
              isCompleted: task?.isCompleted,
              isDeleted: task?.isDeleted,
              isEdited: task?.isEdited,
              members: task?.members,
            }
          )
        );
      }
    });

    const result = {
      fullName: revertedTaskAdmin?.fullName,
      firstName: revertedTaskAdmin?.firstName,
      lastName: revertedTaskAdmin?.lastName,
      age: revertedTaskAdmin?.age,
      email: revertedTaskAdmin?.email,
      language: revertedTaskAdmin?.language,
      github: revertedTaskAdmin?.github,
      linkedIn: revertedTaskAdmin?.linkedIn,
      skills: revertedTaskAdmin?.skills,
      profilePhoto: revertedTaskAdmin?.profilePhoto,
      isAdmin: revertedTaskAdmin?.isAdmin,
      members: revertedTaskAdmin?.members,
      tasks: newTasks,
      adminId: revertedTaskAdmin?._id.toString(),
    };

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

// @desc - delete all task
// @route - PUT '/tasks/deleteAllTasks'
// @access - public
const deleteAllTasks = async (req, res) => {
  const { adminId, userId } = req?.body;

  if (!adminId) return res.status(400).json({ message: "adminId is required" });

  try {
    const admin = await Admin.findOne({ _id: adminId });
    if (!admin)
      return res
        .status(204)
        .json({ message: `no matches admin with id:${adminId}` });

    const member = admin?.members?.filter(
      (member) => member?.memberId === userId
    );
    const historyObj = new History({
      title: "All Tasks",
      type: "deleteAll",
      adminId: adminId,
      date: new Date().toLocaleString(),
      members: member?.length
        ? member
        : [
            {
              fullName: admin?.fullName,
              age: admin?.age,
              email: admin?.email,
            },
          ],
    });

    await historyObj.save();

    admin?.tasks?.forEach((task) => {
      task.isDeleted = true;
    });
    const newAdmin = await admin.save();

    const result = {
      fullName: newAdmin?.fullName,
      firstName: newAdmin?.firstName,
      lastName: newAdmin?.lastName,
      age: newAdmin?.age,
      email: newAdmin?.email,
      language: newAdmin?.language,
      github: newAdmin?.github,
      linkedIn: newAdmin?.linkedIn,
      skills: newAdmin?.skills,
      profilePhoto: newAdmin?.profilePhoto,
      isAdmin: newAdmin?.isAdmin,
      members: newAdmin?.members,
      tasks: [],
      adminId: newAdmin?._id.toString(),
    };

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

// @desc - delete all commpleted task
// @route - PUT '/tasks/deleteCompletedTasks'
// @access - public
const deleteCompletedTasks = async (req, res) => {
  const { adminId, userId } = req?.body;
  if (!adminId) return res.status(400).json({ message: "adminId is required" });

  try {
    const admin = await Admin.findOne({ _id: adminId });
    if (!admin)
      return res
        .status(204)
        .json({ message: `no matches admin with id:${adminId}` });

    const member = admin?.members?.filter(
      (member) => member?.memberId === userId
    );
    const historyObj = new History({
      title: "All Completed Tasks",
      type: "deleteAllCompleted",
      adminId: adminId,
      date: new Date().toLocaleString(),
      members: member?.length
        ? member
        : [
            {
              fullName: admin?.fullName,
              age: admin?.age,
              email: admin?.email,
            },
          ],
    });

    await historyObj.save();

    admin?.tasks?.forEach((task) => {
      if (task?.isCompleted === true) task.isDeleted = true;
    });

    const newAdmin = await admin.save();

    const newTasks = [];
    newAdmin?.tasks?.map((task) => {
      if (!task?.isDeleted) {
        newTasks.push(
          Object.assign(
            {},
            {
              taskId: task?._id?.toString(),
              title: task?.title,
              description: task?.description,
              isCompleted: task?.isCompleted,
              isDeleted: task?.isDeleted,
              isEdited: task?.isEdited,
              members: task?.members,
            }
          )
        );
      }
    });

    const result = {
      fullName: newAdmin?.fullName,
      firstName: newAdmin?.firstName,
      lastName: newAdmin?.lastName,
      age: newAdmin?.age,
      email: newAdmin?.email,
      language: newAdmin?.language,
      github: newAdmin?.github,
      linkedIn: newAdmin?.linkedIn,
      skills: newAdmin?.skills,
      profilePhoto: newAdmin?.profilePhoto,
      isAdmin: newAdmin?.isAdmin,
      members: newAdmin?.members,
      tasks: newTasks,
      adminId: newAdmin?._id.toString(),
    };

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

// @desc - delete a task
// @route - PUT '/tasks/deleteTask'
// @access - public
const deleteTask = async (req, res) => {
  const { adminId, taskId, userId } = req?.body;

  if (!adminId || !taskId)
    return res
      .status(400)
      .json({ message: "adminId and taskId are both required" });

  try {
    const admin = await Admin.findOne({ _id: adminId });
    if (!admin)
      return res
        .status(204)
        .json({ message: `no matches admin with id:${adminId}` });
    const history = [];
    admin?.tasks?.map((task) => {
      if (task?._id?.toString() === taskId) {
        const member = task?.members?.filter(
          (member) => member?.memberId === userId
        );
        history.push({
          title: task?.title,
          type: "deleteOne",
          adminId: adminId,
          date: new Date().toLocaleString(),
          members: member?.length
            ? member
            : [
                {
                  fullName: admin?.fullName,
                  age: admin?.age,
                  email: admin?.email,
                },
              ],
        });
      }
    });

    const historyObj = new History(history[0]);

    await historyObj.save();

    admin?.tasks?.forEach((task) => {
      if (task?._id?.toString() === taskId) task.isDeleted = true;
    });
    const deletedTaskAdmin = await admin.save();

    const newTasks = [];
    deletedTaskAdmin?.tasks?.map((task) => {
      if (!task?.isDeleted) {
        newTasks.push(
          Object.assign(
            {},
            {
              taskId: task?._id?.toString(),
              title: task?.title,
              description: task?.description,
              isCompleted: task?.isCompleted,
              isDeleted: task?.isDeleted,
              isEdited: task?.isEdited,
              members: task?.members,
            }
          )
        );
      }
    });

    const result = {
      fullName: deletedTaskAdmin?.fullName,
      firstName: deletedTaskAdmin?.firstName,
      lastName: deletedTaskAdmin?.lastName,
      age: deletedTaskAdmin?.age,
      email: deletedTaskAdmin?.email,
      language: deletedTaskAdmin?.language,
      github: deletedTaskAdmin?.github,
      linkedIn: deletedTaskAdmin?.linkedIn,
      skills: deletedTaskAdmin?.skills,
      profilePhoto: deletedTaskAdmin?.profilePhoto,
      isAdmin: deletedTaskAdmin?.isAdmin,
      members: deletedTaskAdmin?.members,
      tasks: newTasks,
      adminId: deletedTaskAdmin?._id.toString(),
    };

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  completeTask,
  editTask,
  revertTask,
  deleteAllTasks,
  deleteCompletedTasks,
};
