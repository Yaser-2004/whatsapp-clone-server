import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

async function signup(req, res) {
    try {
        const {name, email, password, gender} = req.body;
        //console.log(req.body);

        const user = await userModel.findOne({email});

        if (user) {
            return res.status(400).json({error: "User already exists"})
        }

        //hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${name}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${name}`;

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            gender: gender,
            avatar: gender === "male" ? boyProfilePic : girlProfilePic,
        })
            //generate jwt token
            //generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            gender: newUser.gender, 
            avatar: newUser.avatar,
            _id: newUser._id
        })

    } catch (error) {
        console.log(error);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log(isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        console.log("Generating token and setting cookie...");
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            _id: user._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred during login" });
    }
}


async function logout (req, res) {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log(error);
    }
}

export {signup, login, logout};