const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "please provide a username and password" });
  }

  const id = new Date().getDate();
  console.log(new Date(), new Date().getDate());
  const token = jwt.sign({ id, username }, process.env.private_key, {
    expiresIn: "30d",
  });
  res.send({ message: "user create success", token: token });
};

exports.dashboard = async (req, res) => {
  const user = req.user;

  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hellow ${user.username}`,
    secret: ` Here is your authorized data , your lucky number is ${luckyNumber}`,
  });
};
