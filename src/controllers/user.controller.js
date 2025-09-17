import { get } from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { json } from "sequelize";

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

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "error al traer los usuarios",
        error: error.message,
      });
    }
  },

   getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if(!user){
        return res.status(404).json({msg:'usuario no encontrado'});
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "error al traer el usuario",
        error: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const {id} = req.params; 
      const{username,email,password,role} = req.body;
      const updates = {};
      if(username)updates.username=username;
      if(email)updates.email=email;
      if(role)updates.role=role;
      if(password){
        const saltRouds = 10;
      updates.password = await bcrypt.hash(password, saltRouds);
      }
      const updatedUser = await User.findByIdAndUpdate(id,updates,{new:true,runValidators:true}).select('-password');
      if(!updatedUser){
        return res.status(404).json({msg:'usuario no encontrado'});
      }
      res.status(200).json({msg:'usuario actualizado correctamente',user:updatedUser});
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "error al actualizar el usuario",
        error: error.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const {id} = req.params; 
      const user = await User.findById(id);
      if(!user){
        return res.status(404).json({msg:'usuario no encontrado'});
      }
      user.deleted_at = new Date();
      await user.save();
      res.status(200).json({msg:'usuario eliminado correctamente'});
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "error al eliminar el usuario",
        error: error.message,
      });
    }
  }
};
export default userController;
