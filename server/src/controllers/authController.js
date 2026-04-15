import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const existingUser = await pool.query(
      "select * from users where email = $1",
      [email],
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "insert into users (name , email, password ) values ($1,$2,$3) returning name, email",
      [name, email, hashedPassword],
    );
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while registering user" });
  }
};

export const login = async (req, res) => {
    const { email , password} = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const user  = await pool.query("select id, name, email, password from users where email = $1", [email])
        const existingUser = user.rows[0]
        if(!existingUser){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({id:existingUser.id} , process.env.JWT_SECRET, { expiresIn: "3d" })
        res.status(200).json({ message: "User logged in successfully",token, user: { name: existingUser.name, email: existingUser.email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
}


