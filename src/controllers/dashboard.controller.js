const helloWorld = (req, res) => {
  res.status(200).json({ message: "hello world" });
};

module.exports = { helloWorld };
