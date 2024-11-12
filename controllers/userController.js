const userDetails = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

// register
exports.registerController = async (req,res)=>{
    console.log("Inside register controller");
    console.log(req.body);
    const {userId,firstName,lastName,email,password,phoneNumber} = req.body
    try{
                const existingUser = await userDetails.findOne({email})
                if(existingUser){
                    res.status(406).json("Already Existing User........Please Login!!!")
                }else{
                    const newUser = new userDetails({
                        userId,firstName,lastName,email,password,phoneNumber
                    })
                    await newUser.save()
                    res.status(200).json(newUser)
                }
            } catch(err){
                console.log(err);
                res.status(401).json(err)
            }
    res.status(200).json("register request received")
    
}

//login 
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body;
    console.log(email, password);

    try {
        // Find the user by email only
        const existingUser = await userDetails.findOne({ email });
        if (!existingUser) {
            return res.status(404).json("Incorrect email or password!!!");
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(404).json("Incorrect email or password!!!");
        }

        // Generate a JWT token if the password is correct
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD, {
            expiresIn: '1h' // Set an expiration time as needed
        });

        // Exclude password from the response
        const { password: _, ...userWithoutPassword } = existingUser._doc; // Use `_doc` to strip the password field

        res.status(200).json({ user: userWithoutPassword, token });
    } catch (err) {
        console.log(err);
        
        res.status(500).json("Server error");
    }
};

// view all users
exports.allUserController = async(req,res)=>{
    console.log("inside allUserController");
    try{
        const allUsers = await userDetails.find()
        res.status(200).json(allUsers)

    }catch(err){
        res.status(401).json(err)
    }
    
}

//View one user
exports.singleUserController = async(req,res)=>{
    console.log("inside singleUserController");
    const{email} =req.body

    try{
        const user = await userDetails.findOne({email})
        
        res.status(200).json({
            userId:user.userId,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            phoneNumber:user.phoneNumber

        })
    }catch(err){
        res.status(401).json(err)
    }
    
}