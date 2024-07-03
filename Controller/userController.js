import User from "../Model/userSchema.js";
import bcrypt from "bcrypt";
import transporter from "../Service/nodemailer.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in register" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetail = await User.findOne({ email });
    if (!userDetail) {
      return res.status(401).json({ message: "User not found", data:false });
    }
    const passwordMatch = await bcrypt.compare(password, userDetail.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "credentials mismatched",data:false});
    }
    res.status(200).json({ message: "user logged in successfully" ,data:true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error in login" });
  }
};

export const forgotpassword = async (req, res) => {
  const { email } = req.body;

  let oldUser = await User.findOne({ email });
  console.log(email);
  if (!oldUser) {
    res.status(404).json({ message: "User not found" });
  }
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()";
  const randomStringGenerator = (length) => {
    let randomString = "";
    for (let i = 0; i <= length; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    console.log(randomString);
    return randomString;
  };
  const randomID = randomStringGenerator(5);
  await User.updateOne({ email }, { passwordresetstring: randomID });
  const mailOptions = {
    from: "vatsan.designs@gmail.com",
    to: email,
    subject: "Hello testing",
    html: `<a href="http://localhost:5173/reset_password/${randomID}/${email}">Change Password</a>`,
  };
  transporter.sendMail(mailOptions);
  res.status(200).send("Mail sent");
};

export const resetpassword = async (req, res) => {
  // console.log("reset working")
  const { id, email } = req.body;
  console.log("resetID", id);
  console.log("email", email);

  const userDetails = await User.findOne({ email });

  if (!userDetails) {
    console.log("its a delay");
  }
  res.status(200).json({ result: userDetails });
};

export const updatepassword = async (req, res) => {
  //get email to find user
  const { email, newPassword } = req.body;

  //encrypt the received password
  const hashPassword = await bcrypt.hash(newPassword, 10);
  // console.log(hashPassword)

//erase the password reset string
const emptyString= ''

  //find update the user password
  const selectedUser = await User.findOneAndUpdate({email},{password:hashPassword, passwordresetstring:emptyString})
  res.status(200).json({data:selectedUser,message:"User Password updated successfully"})

  

};
