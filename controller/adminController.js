const Admin = require("../model/Admins");
const { hashPassword } = require("../helpers/hashPasswordBcrypt");
const { randomId } = require("../helpers/randomId");

// @desc - all admin
// @route - GET '/admins'
// @access - public
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (!admins) return res.status(204).json({ message: "No admin found" });
    res.json(admins);
  } catch (err) {
    console.log(err);
  }
};

// @desc - all admin
// @route - GET '/login/getAdmin'
// @access - public
const getAdmin = async (req, res) => {
  const { email, password } = req?.body;

  try {
    const admin = await Admin.findOne({ email, password: hashPassword(password) });

    if (!admin) return res.status(204).json({ message: "No admin found" });

    const result = {
      fullName: admin?.fullName,
      firstName: admin?.firstName,
      lastName: admin?.lastName,
      age: admin?.age,
      email: admin?.email,
      language: admin?.language,
      github: admin?.github,
      linkedIn: admin?.linkedIn,
      skills: admin?.skills,
      profilePhoto: admin?.profilePhoto,
      isAdmin: admin?.isAdmin,
      members: admin?.members,
      tasks: admin?.tasks,
      adminId: admin?._id.toString(),
    };

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

// @desc - get visitor
// @route - GET '/login/getVisitor'
// @access - public
const getVisitor = async (req, res) => {
  const { username } = req?.body;

  try {
    const searchedVisitor = await Admin.find({
      members: {
        $elemMatch: {
          $or: [{
            linkedIn: username,

          }, {
            github: username
          }
          ]
        }
      }
    }, { "members.$": 1 });

    const searchedAdmin = await Admin.find({
      members: {
        $elemMatch: {
          $or: [{
            linkedIn: username,

          }, {
            github: username
          }
          ]
        }
      }
    });

    const adminId = searchedAdmin[0]?._id?.toString();
    const visitor = searchedVisitor[0]?.members?.[0]

    if (!visitor) return res.status(204).json({ message: "No visitor found" });
    if (!adminId) return res.status(204).json({ message: "No admin found" });

    const admin = await Admin.findOne({ _id: adminId });

    const memberTask=[];
    admin?.tasks.filter(task => {
      if (task?.members?.filter(member => member?.memberId === visitor.memberId).length)
        memberTask.push(task);
    })
    
    const newTasks = [];
    memberTask?.map(task => {
      if (!task?.isDeleted) {
        newTasks.push(Object.assign({}, {
          taskId: task?._id?.toString(),
          title: task?.title,
          description: task?.description,
          isCompleted: task?.isCompleted,
          isDeleted: task?.isDeleted,
          isEdited: task?.isEdited,
          members: task?.members,
        }))
      }
    })

    const result = {
      fullName: visitor?.fullName,
      firstName: visitor?.firstName,
      lastName: visitor?.lastName,
      age: visitor?.age,
      language: visitor?.language,
      github: visitor?.github,
      linkedIn: visitor?.linkedIn,
      skills: visitor?.skills,
      profilePhoto: visitor?.profilePhoto,
      isAdmin: visitor?.isAdmin,
      members: admin?.members,
      memberId:visitor?.memberId,
      tasks: newTasks,
      adminId,
    };

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

// @desc - create a admin
// @route - POST '/admins'
// @access - public
const createAdmin = async (req, res) => {
  const admin = req?.body;

  const adminObj = new Admin(
    {
      fullName: admin?.fullName,
      firstName: admin?.firstName,
      lastName: admin?.lastName,
      age: admin?.age,
      email: admin?.email,
      language: admin?.language,
      github: `https://github.com/${admin?.github}`,
      linkedIn: `https://www.linkedin.com/in/${admin?.linkedIn}`,
      skills: admin?.skills,
      profilePhoto: admin?.profilePhoto,
      isAdmin: admin?.isAdmin,
      members: [{
        fullName: admin?.fullName,
        firstName: admin?.firstName,
        lastName: admin?.lastName,
        age: admin?.age,
        email: admin?.email,
        language: admin?.language,
        github: admin?.github,
        linkedIn: admin?.linkedIn,
        skills: admin?.skills,
        profilePhoto: admin?.profilePhoto,
        isAdmin: admin?.isAdmin,
        memberId: randomId()
      }],
      tasks: [],
    }
  );

  try {
    const saveAdmin = await adminObj.save();

    const result = {
      fullName: saveAdmin?.fullName,
      firstName: saveAdmin?.firstName,
      lastName: saveAdmin?.lastName,
      age: saveAdmin?.age,
      email: saveAdmin?.email,
      language: saveAdmin?.language,
      github: saveAdmin?.github,
      linkedIn: saveAdmin?.linkedIn,
      skills: saveAdmin?.skills,
      profilePhoto: saveAdmin?.profilePhoto,
      isAdmin: saveAdmin?.isAdmin,
      members: saveAdmin?.members,
      adminId: saveAdmin?._id.toString(),
    };

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// @desc - update a admin
// @route - PUT '/admins'
// @access - public
const updateAdmin = async (req, res) => {
  const { id, title, age, linkedIn, github, skills, language, isAdmin } =
    req?.body;
  if (!id) return res.status(400).json({ message: "Id parameter is required" });

  try {
    const admin = await Admin.findOne({ _id: id });
    if (!admin)
      return res
        .status(204)
        .json({ message: `No matches admin with id:${id}` });

    if (req.body?.title) admin.title = title;
    if (req.body?.age) admin.age = age;
    if (req.body?.linkedIn) admin.linkedIn = linkedIn;
    if (req.body?.github) admin.github = github;
    if (req.body?.skill) admin.skills = skills;
    if (req.body?.language) admin.language = language;
    if (req.body?.isAdmin) admin.isAdmin = isAdmin;

    await admin.save();
    const allAdmins = await admin.find();
    res.json(allAdmins);
  } catch (err) {
    console.log(err);
  }
};

// @desc - delete a admin
// @route - DELETE '/admins'
// @access - public
const deleteAdmin = async (req, res) => {
  const { id } = req?.body;
  if (!id) return res.status(400).json({ message: "id parameter is required" });

  try {
    const admin = Admin.findOne({ _id: id });
    if (!admin)
      return res
        .status(204)
        .json({ message: `no matches admin with id:${id}` });
    await admin.deleteOne();
    const allAdmins = await Admin.find();
    res.json(allAdmins);
  } catch (err) {
    console.log(err);
  }
};

// @desc - update a admin
// @route - PUT '/admins'
// @access - public
const newMember = async (req, res) => {
  const { adminId, ...members } = req?.body;
  if (!adminId) return res.status(400).json({ message: "Id parameter is required" });

  try {
    const admin = await Admin.findOne({ _id: adminId });
    if (!admin)
      return res
        .status(204)
        .json({ message: `No matches admin with id:${adminId}` });

    if (!admin.isAdmin) return;

    members.memberId = randomId();

    admin.members = [...admin.members, members]

    const saveMember = await admin.save();

    const result = {
      fullName: saveMember?.fullName,
      firstName: saveMember?.firstName,
      lastName: saveMember?.lastName,
      age: saveMember?.age,
      email: saveMember?.email,
      language: saveMember?.language,
      github: `https://github.com/${saveMember?.github}`,
      linkedIn: `https://www.linkedin.com/in/${saveMember?.linkedIn}`,
      skills: saveMember?.skills,
      profilePhoto: saveMember?.profilePhoto,
      isAdmin: saveMember?.isAdmin,
      adminId: saveMember?._id.toString(),
      members: saveMember?.members,
    }
    console.log("result: ", result);
    // const allAdmins = await member.find(); 
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  newMember,
  getAdmin,
  getVisitor
};
