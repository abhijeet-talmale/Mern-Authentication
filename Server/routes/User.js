import express from 'express';
import bcrypt from 'bcrypt';
import {User} from '../models/UserSchema.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'


const router=express.Router();

router.post('/signup',async(req,res)=>{
    const {username,email,password}=req.body;
    const user=await User.findOne({email});

    if(user){
        return res.json({message:'user already exists'})
    }

    const hashpassword = await bcrypt.hash(password,10);
    const newUser=new User({
        username,
        email,
        password:hashpassword
        
    })
    await newUser.save();

    try {
       

        

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',//Add Your Email Id
                pass: ''// Add your Password
            }
        });

        const mailOptions = {
            from: '',//Add Your Email Id
            to: email,
            subject: 'Reset Password',
            text: `${username} Successfully Regiestered`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ status: false, message: 'Error sending email' });
            } else {
                return res.json({ status: true, message: 'Email sent successfully' });
            }
        });

    } catch (error) {
        console.log(error);
        return res.json({ status: false, message: 'An error occurred' });
    }

    return res.json({status:true,message:'record regiester'});
    

    
    
})

router.post('/login',async (req,res)=>{
    const{email,password}=req.body;
    const user= await User.findOne({email});
    if(!user){
        return res.json({message:'user is not regiestered'})
    }
    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword){
        return res.json({message:'password is incorrect'});
    }
    const token=jwt.sign({username:user.username},process.env.key,{expiresIn:'1h'});
    res.cookie('token',token,{httpOnly:true,maxAge:'360000'});
    return res.json({status:true,message:'login successfully'});
})

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ status: false, message: 'User is not registered' });
        }

        const token = jwt.sign({ email }, process.env.KEY, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',//Add Your Email Id
                pass: '' //Add Your Password
            }
        });

        const mailOptions = {
            from: '',//Add Your Email Id
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetpassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ status: false, message: 'Error sending email' });
            } else {
                return res.json({ status: true, message: 'Email sent successfully' });
            }
        });

    } catch (error) {
        console.log(error);
        return res.json({ status: false, message: 'An error occurred' });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const email = decoded.email;

        const hashpassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ email: email }, { password: hashpassword });

        return res.json({ status: true, message: "Password updated successfully" });

    } catch (error) {
        console.log(error);
        return res.json({ status: false, message: "Invalid token" });
    }
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({status:true});
})
router.get('/getUsers',(req,res)=>{
    User.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})
export {router as UserRouter};
