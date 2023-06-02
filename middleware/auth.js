const jwt = require("jsonwebtoken");

exports.authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send({ message: "no token provided " });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.private_key);
    const { id, username } = decode;
    req.user = { id, username };
    next();
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};
