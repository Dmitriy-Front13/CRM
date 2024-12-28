import prisma from "../../prisma/prisma.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { fullName, password } = req.body;
    const user = await prisma.employee.findUnique({
      where: {
        fullName: fullName,
        password: password
      }
    })
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ fullName: user.fullName, position: user.position }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('authToken', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
}

export default login;