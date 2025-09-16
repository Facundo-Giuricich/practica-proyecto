import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "El nombre de Usuario es obligatorio"],
      unique: true,
      minlength: 3,
      maxlength: 20,
    },

    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Por favor, usa un email válido."],
    },

    password: {
      type: String,
      required: [true, "Debe ingresar una contraseña"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    deleted_at: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
