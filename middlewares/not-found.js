const notFound = (req, res) => {
  res.res.sendStatus(404).send("Route Does Not Exist");
};

module.exports = notFound;
