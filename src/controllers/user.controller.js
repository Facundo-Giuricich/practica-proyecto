import User from "../models/User.js";
import bcrypt from "bcrypt";

const userController = {
  createUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.status(400).json({ msg: "usuario o email ya está en uso" });
      }
      const saltRouds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRouds);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({
        ok: true,
        msg: "usuario creado correctamente",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: "error al crear el usuario",
        error: error.message,
      });
    }
  },
};
export default userController;
