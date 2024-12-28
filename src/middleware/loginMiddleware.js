import jwt from "jsonwebtoken";

const loginMiddleware = (position) => {
  return function (req, res, next) {
    try {
      // Извлекаем токен из куки
      const token = req.cookies.authToken; 
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Проверяем токен и извлекаем позицию пользователя
      const { position: userPosition } = jwt.verify(token, process.env.JWT_SECRET);
      if (userPosition !== position) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };
};

export default loginMiddleware;
