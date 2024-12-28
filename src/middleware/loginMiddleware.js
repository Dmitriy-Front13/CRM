import jwt from "jsonwebtoken";
const loginMiddleware = (position) => {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const {position: userPosition} = jwt.verify(token, process.env.JWT_SECRET);
      if (userPosition !== position) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
 
};

export default loginMiddleware;