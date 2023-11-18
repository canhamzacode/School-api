const getAllClasses = async (req, res) => {
  try {
    const allClass = await Class.find({});
    res
      .status(StatusCodes.OK)
      .json({ message: "Sucessfully retrieved all class ", allClass });
  } catch (error) {}
};

const addNewClass = (req, res) => {
  res.send("Get All Students");
};

const deleteClass = (req, res) => {
  res.send("Delete class");
};

module.exports = {
  getAllClasses,
  addNewClass,
  deleteClass,
};
