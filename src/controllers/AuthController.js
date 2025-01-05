import prisma from "../../prisma/prisma.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { fullName, password } = req.body;
    const user = await prisma.employee.findFirst({
      where: {
        fullName: fullName,
        password: password, // Обратите внимание: пароли лучше хешировать.
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign(
      { fullName: user.fullName, position: user.position },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Устанавливаем токен в куки
    res.cookie('authToken', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1 час
    });

    // Возвращаем сообщение об успехе и данные пользователя
    res.status(200).json({
        fullName: user.fullName,
        position: user.position,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getUser = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Расшифровываем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Возвращаем данные пользователя (например, fullName и position)
    res.status(200).json({
      fullName: decoded.fullName,
      position: decoded.position,
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
}

export const logout = async (req, res) => {
  try {
    // Удаляем куки, содержащие токен
    res.clearCookie("authToken", {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({ error: "Failed to log out" });
  }
};
