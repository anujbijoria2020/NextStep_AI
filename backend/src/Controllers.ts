import type { Request,Response } from "express";
import { StrongAuthSchema } from "./utilities/validations.js";
import { RoadMapModel, User } from "./db.js";
import { DoCompare, DoHash } from "./utilities/hashing.js";
import jwt from "jsonwebtoken"
import { JWT_TOKEN } from "./index.js";
import { sendMail, transporter } from "./mail/mailer.js";
import { generateRoadMap } from "./AiIntegeration.js";

export const tempAuthKey= "mySecretKey";

export const signUpController = async (req: Request, res: Response) => {
  const { email, password, InputOtp } = req.body;

  const validatedUser = StrongAuthSchema.safeParse({ email, password });
  if (!validatedUser.success) {
    return res.status(400).json({
      message: "Input validation failed",
      success: false,
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser?.isVerified) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
   
    if(!InputOtp) return res.status(401).json("please provide Otp");

    const ValidOtp = await DoCompare(InputOtp, existingUser?.verificationCode!);
    if (!ValidOtp) {
      return res.status(401).json({ message: "Enter Correct Otp", success: false });
    }

    const hashedPassword = await DoHash(password, 12);

    if (existingUser) {
      existingUser.password = hashedPassword;
      existingUser.verificationCode = "";
      existingUser.isVerified = true;
      await existingUser.save();
    } else {
      await User.create({
        email,
        password: hashedPassword,
        verificationCode: "",
        isVerified: true,
      });
    }

    const user = await User.findOne({ email });
    const token = jwt.sign(
      { id: user?._id, email: user?.email },
      JWT_TOKEN || tempAuthKey,
    );

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      token,
      user: { id: user?._id, email: user?.email },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


const SendOtpController = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const existingUser = await User.findOne({ email });

 const otp = Math.floor(100000 + Math.random() * 900000).toString(); // ensures 6 digits
 const html =  `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #1a1f36, #2a2f45); color: #f5f5f5; padding: 40px; border-radius: 12px; max-width: 600px; margin: auto;">
    
    <!-- Header -->
    <h2 style="color: #7c5cff; text-align: center; margin-bottom: 20px;">NextStep AI - Email Verification</h2>
    <p style="font-size: 15px; text-align: center; color: #ddd;">Secure your journey with AI. Please verify your email.</p>
    
    <!-- OTP Box -->
    <div style="margin: 30px auto; text-align: center;">
      <span style="display: inline-block; font-size: 26px; letter-spacing: 6px; font-weight: bold; color: #fff; background: linear-gradient(90deg, #7c5cff, #4CAF50); padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
        ${otp}
      </span>
    </div>
    
    <!-- Info -->
    <p style="text-align: center; font-size: 14px; color: #bbb;">
      This OTP is valid for <b>10 minutes</b>. Please do not share it with anyone.
    </p>
    
    <p style="text-align: center; font-size: 14px; color: #bbb;">
      If you didn’t request this, you can safely ignore this email.
    </p>
    
    <!-- Footer -->
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #444;" />
    <p style="font-size: 12px; color: #777; text-align: center;">
      &copy; ${new Date().getFullYear()} <span style="color:#7c5cff;">NextStep AI</span>. All rights reserved.
    </p>
  </div>
  `
    // Send OTP mail
    const mailInfo = await sendMail(
      email,
      "🔐 OTP Verification - NextStep AI",
      html
    );

    if (!mailInfo) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    const hashedOtp = await DoHash(otp, 5);

    if (existingUser) {
    
      existingUser.verificationCode = hashedOtp;
      await existingUser.save();
    } else {
      const newUser = new User({
        email,
        verificationCode: hashedOtp,
        isVerified: false,
      });
      await newUser.save();
    }

    return res.status(200).json({
      message: "OTP sent successfully",
      email,
      hashedOtp
    });
  } catch (error: any) {
    console.error("Error in /sendotp:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


const LoginController = async(req:Request,res:Response)=>{
    const {email,password} = req.body;
  try{
  const validatedUser = StrongAuthSchema.parse({email,password});
    if(!validatedUser){
        return res.status(404).json({
            message:"Input Validation failed",
            success:false
        })
    }
    const existingUser = await User.findOne({email});
    if(!existingUser){
        return res.status(401).json({
            message:"User Not Found",
            success:false
        })
    }
    if(!existingUser?.isVerified) return res.status(404).json({message:"User Not Verified",success:false});
    const MatchedPassword = await DoCompare(password,existingUser.password as any);
    
    if(!MatchedPassword){
        return res.status(404).json({
            message:"Incorrect Password",
            success:false
        })
    }
    const token = jwt.sign({id:existingUser._id,email:email},JWT_TOKEN||tempAuthKey);

    return res.status(200).json({
        message:"user logged in",
        success:true,
        token
    })

  }catch(error:any){
console.log("login error : ",error);
return res.status(500).json({
    message:error.message,
    success:false
})
  }
}

const GenarateRoadmapController = async(req:Request,res:Response)=>{
  const {topic,goal} = req.body;
  const user = (req as any).user;
   const prompt = `Create a detailed learning roadmap for: ${topic}

 Goal: ${goal}
 TimeFrame: maximum 1 year

 Please respond with a JSON object in this exact format:
 {
   "title": "Clear roadmap title",
   "description": "Brief overview of the learning path",
   "items": [
     {
       "title": "Step title",
       "description": "Detailed description of what to learn/do",
       "timeframe": "Estimated time (e.g., '2 weeks', '1 month')",
       "difficulty": "Beginner|Intermediate|Advanced",
       "resources": ["Resource 1", "Resource 2"]
     }
   ]
 }
 Create 6-10 progressive steps that build upon each other. Make it practical and actionable.`;

  try{
    const Generatedtext = await generateRoadMap(prompt as string) ;
    
   const newContent = await RoadMapModel.create({
    user:user.id,
    goal,
    topic,
    title:Generatedtext.title,
    description:Generatedtext.description,
    items:Generatedtext.items
   });

   

    return res.status(200).json({
      message:"RoadMap generated successfully",
      Generatedtext:Generatedtext,
      RoadMapId:newContent._id,
      success:true
    });

  }catch(error:any){
    console.log(error);
    return res.status(400).json({
        message:"Something Went Wrong",
        success:false
    })
  }
}

const showRoadMapController =async(req:Request,res:Response)=>{
  const RoadMapId = req.params.roadMapId;
  try{
  const isRoadMapIdValid = await RoadMapModel.findOne({_id:RoadMapId});
  if(!isRoadMapIdValid){
    return res.status(401).json({
      message:"roadmap not found",
      success:false,
    });
  }
  return res.status(201).json({
    message:"RoadMap Fetched successsfully",
    RoadMapContent:isRoadMapIdValid,
    success:true
  });

  }catch(error:any){
    console.log(error);
    return res.status(500).json({
      message:error.message,
      success:false
    })
  }

}

 const getAllRoadmapsController = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const roadmaps = (await RoadMapModel.find({ user: user.id })).reverse();

    return res.status(200).json({
      message: "Fetched all roadmaps successfully",
      roadmaps,
      success: true,
    });
  } catch (error: any) {
    console.error("Error fetching roadmaps:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      success: false,
    });
  }
};

 const contact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    await sendMail(
      process.env.EMAIL_USER as string,
      `NextStepAI Contact Message from ${name}`,
      `
        <h3>You got a new message 💌</h3>
        <p><b>From:</b> ${name} (${email})</p>
        <p><b>Message:</b> ${message}</p>
      `
    );

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ success: false, message: "Failed to send message", error });
  }
};
export default{
    signUpController,
    SendOtpController,
    LoginController,
    GenarateRoadmapController,
    showRoadMapController,
    getAllRoadmapsController,
    contact
}