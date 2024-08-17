import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, "TOPSECRETWORD", {
        expiresIn: "1d"
    })

    //console.log("token >>>", token);

    res.cookie("jwt", token, {
        maxAge: 1*24*60*60*1000,
        httpOnly: true,
        sameSite: "None", 
        secure: true 
    })

};

export default generateTokenAndSetCookie;