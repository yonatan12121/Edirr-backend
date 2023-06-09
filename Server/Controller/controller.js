const express = require('express');
const app = express();
app.use(express.json());
const chapa = require('chapa-nodejs');
const bcrypt = require("bcryptjs");


const cors = require("cors");
app.use(cors());
var User = require('../Model/UserModel');
var Admin = require('../Model/AdminModel');

var Edirs = require('../model/model');
var UserInfo = require('../model/UserInfoModel');
const jwt = require("jsonwebtoken");
const { Job } = require('node-schedule');

const JWT_SECRET = "nhjndshnbhsiduy78q3ye3yhrewhriewopfew[fpe-fpe-pf[df[s;f[ds;f[ds;f[ds;f[ds;,fld,s.mdnshbgvcarfdtwygyqgygdhsabjbcnvgawqrr6t8siahjdvdgvds()!@#$%^&*";




exports.uploads = async (req, res) => {
  console.log("we are in upload");
  const body = req.body;
  try {
    const newImage = await Post.create(body)
    newImage.save();
    res.status(201).json({ msg: "New image uploaded...!" })
  } catch (error) {
    res.status(409).json({ message: error.message })
    console.log(error);
  }
}


exports.img = async (req, res) => {
  console.log("we are fetching the images");
  Post.find((err, docs) => {
    if (!err) {
      res.render("post", {
        data: docs
      });
    } else {
      console.log('Failed to retrieve the Course List: ' + err);
    }
  });
}
  // exports.test=async()=>{
  //   var i;
  // const PaymentDay="11"
  // // Your code here
  // const now = new Date();
  // const aa = String(now);
  // var bb = aa.split(" ", 4);
  // const curentpayment = bb[2];
  // console.log(curentpayment);
  // const Edir= await Edirs.find({CurrentPaymentDay:curentpayment});
  // // const users= await User.find();
  // // console.log(Edir);
  // // console.log(Edir[0].Members[0].Email)
  // var Store = []
  // Edir.forEach((eDir)=>{
  //   eDir.Members.forEach((members)=>{
  //     Store = Store.concat( members.Email)
  //   })
  // })
  // // console.log(Store);

  // Store.forEach(async (eDir) =>{
  //   const paymentNotification =await Edirs.find({"Members.Email": eDir,"Members.Payment": "Not Payed",CurrentPaymentDay:curentpayment});
  //   // console.log(paymentNotification);
  //   var next;
  //   paymentNotification.forEach((PN)=>{
  //     console.log(PN.PaymentDuration)
      
  //     if(PN.PaymentDuration==30){
  //       var newpayment =(parseInt(PN.CurrentPaymentDay) + 30)
        
  //       console.log(newpayment);
  //       if (newpayment>30){
  //        next = newpayment-30
  //         console.log(next)
           
  //       }
  //       else{
  //         next=newpayment;
  //       }
  //     }
  //     else if(PN.PaymentDuration==7){
  //       console.log("we in 7");
  //       var newpayment =(parseInt(PN.CurrentPaymentDay) + 7)

  //       console.log(newpayment);
  //       if (newpayment>30){
  //         next = newpayment-30
  //         console.log(next)
           
  //       }
  //       else{
  //         next=newpayment;
  //       }
  //     }else if(PN.PaymentDuration==14){
  //       var newpayment =(parseInt(PN.CurrentPaymentDay) + 14)

  //       console.log(newpayment);
  //       if (newpayment>30){
  //          next = newpayment-30
  //         console.log(next)
           
  //       }
  //       else{
  //         next=newpayment;
  //       }
  //     }else if(PN.PaymentDuration==21){
  //       var newpayment =(parseInt(PN.CurrentPaymentDay) + 21)

  //       console.log(newpayment);
  //       if (newpayment>30){
  //          next = newpayment-30
  //         console.log(next)
           
  //       }
  //       else{
  //         next=newpayment;
  //       }
  //     }
  //     console.log(next);
  //        Edirs.updateOne( { NameOfeDirr: PN.NameOfeDirr },{ $set: { CurrentPaymentDay: next }},(err,doc)=>{
  //         if (err) return console.log(err);
  //         console.log("current payemnt updated ");
  //       });
  //     // console.log(PN.NameOfeDirr,now,PN.Amount)
  //     // User.updateOne({email:eDir},{$push:{Notification:[{text:"Your monthly payment is due ",edirr:PN.NameOfeDirr,type:"mPayment",Date:now,Payment:PN.Amount}]}},(err,doc)=>{
  //     //   if (err) return console.log(err);
       
  //     // });
  //   })
  // }
  // )
  // User.updateOne({email:email},{$push:{Notification:[{text:"you have joined "+ edirr,edirr:edirr}]}},(err,doc)=>{
  //       if (err) return console.log(err);
  //       console.log("NOtified")
  //     });
  // var b=[];
  // for (i =0 ;i < users.length;i++){
 
  //   b = b.concat(users[i].Members.Email);
  //   //  console.log(b);
  // }
  
  //   // console.log(users[);
   

  

// }



exports.runOnceADay=async() => {
 
  var i;
  const PaymentDay="11"
  // Your code here
  const now = new Date();
  const aa = String(now);
  var bb = aa.split(" ", 4);
  const curentpayment = bb[2];
  console.log(curentpayment);
  const Edir= await Edirs.find({CurrentPaymentDay:curentpayment});
  // const users= await User.find();
  // console.log(users);
  // console.log(Edir[0].Members[0].Email)
  var Store = []
  Edir.forEach((eDir)=>{
    eDir.Members.forEach((members)=>{
      Store = Store.concat( members.Email)
    })
  })
  // console.log(Store);

  Store.forEach(async (eDir) =>{
    const paymentNotification =await Edirs.find({"Members.Email": eDir,"Members.Payment": "Not Payed",CurrentPaymentDay:curentpayment});
    // console.log(paymentNotification);
    paymentNotification.forEach((PN)=>{
      console.log(PN.NameOfeDirr,now,PN.Amount)
      User.updateOne({email:eDir},{$push:{Notification:[{text:"Your monthly payment is due ",edirr:PN.NameOfeDirr,type:"mPayment",Date:now,Payment:PN.Amount}]}},(err,doc)=>{
        if (err) return console.log(err);
        console.log("NOtified");
        var next;
        paymentNotification.forEach((PN)=>{
          console.log(PN.PaymentDuration)
          
          if(PN.PaymentDuration==30){
            var newpayment =(parseInt(PN.CurrentPaymentDay) + 30)
            
            console.log(newpayment);
            if (newpayment>30){
             next = newpayment-30
              console.log(next)
               
            }
            else{
              next=newpayment;
            }
          }
          else if(PN.PaymentDuration==7){
            console.log("we in 7");
            var newpayment =(parseInt(PN.CurrentPaymentDay) + 7)
    
            console.log(newpayment);
            if (newpayment>30){
              next = newpayment-30
              console.log(next)
               
            }
            else{
              next=newpayment;
            }
          }else if(PN.PaymentDuration==14){
            var newpayment =(parseInt(PN.CurrentPaymentDay) + 14)
    
            console.log(newpayment);
            if (newpayment>30){
               next = newpayment-30
              console.log(next)
               
            }
            else{
              next=newpayment;
            }
          }else if(PN.PaymentDuration==21){
            var newpayment =(parseInt(PN.CurrentPaymentDay) + 21)
    
            console.log(newpayment);
            if (newpayment>30){
               next = newpayment-30
              console.log(next)
               
            }
            else{
              next=newpayment;
            }
          }
          console.log(next);
             Edirs.updateOne( { NameOfeDirr: PN.NameOfeDirr },{ $set: { CurrentPaymentDay: next }},(err,doc)=>{
              if (err) return console.log(err);
              console.log("current payemnt updated ");
            });
         
        })
      
      });
    })
  })
// 
// //////////// / /////update the curent payment day by the duration;
// 
  // User.updateOne({email:email},{$push:{Notification:[{text:"you have joined "+ edirr,edirr:edirr}]}},(err,doc)=>{
  //       if (err) return console.log(err);
  //       console.log("NOtified")
  //     });
  // var b=[];
  // for (i =0 ;i < users.length;i++){
 
  //   b = b.concat(users[i].Members.Email);
  //   //  console.log(b);
  // }
  
    // console.log(users[);
   

  


  
}
//   )
// app.get("/api/get/payli",
exports.payli = (req, res) => {
  const name = "werfa";
  const sqlGet = "SELECT * FROM werfano ";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
}
//   );




//   app.post("/register", 
exports.register = async (req, res) => {
  const { userName, fullName, phoneNumber, email, password, cpassword } = req.body;
  const role = "user";
  // const Creator =email;

  const encreptedPassword = await bcrypt.hash(password, 10);

  console.log("hello");

  try {
    await User.create({
      userName,
      fullName,
      phoneNumber,
      email,
      password: encreptedPassword,

      role,
      verified: false
    });

    console.log("success");
   

    // this is where email verification is done
    console.log("forget password");
    var nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "refugee823@gmail.com",
        pass: "kulwwmpybuhcvfeq",
      },
    });
    console.log("hello", email);
    if (email) {
      console.log(email);
      const forgotPasswordToken = jwt.sign(
        { userEmail: email },
        "Wintu-Yoni@2022",
        {
          expiresIn: "4h",
        }
      );

      var forgotPasswordLink =
        "http://localhost:3000/login/?token=" + forgotPasswordToken;
      var mailOptions = {
        from: "valwintina@gmail.com",
        to: email,
        subject: "Email verifcation",
        html:
          '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
          '<html xmlns="http://www.w3.org/1999/xhtml"><head>' +
          '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
          "<title>Forgot Password</title>" +
          "<style> body {background-color: #FFFFFF; padding: 0; margin: 0;}</style></head>" +
          '<body style="background-color: #FFFFFF; padding: 0; margin: 0;">' +
          '<table border="0" cellpadding="0" cellspacing="10" height="100%" bgcolor="#FFFFFF" width="100%" style="max-width: 650px;" id="bodyTable">' +
          '<tr><td align="center" valign="top">' +
          '<table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailContainer" style="font-family:Arial; color: #333333;">' +
          '<tr><td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding-  bottom: 10px;">' +
          "</td></tr><tr>" +
          '<td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding: 20px 0 10px 0;">' +
          '<span style="font-size: 18px; font-weight: normal;">FORGOT PASSWORD</span></td></tr><tr>' +
          '<td align="left" valign="top" colspan="2" style="padding-top: 10px;">' +
          '<span style="font-size: 12px; line-height: 1.5; color: #333333;">' +
          " We have sent you this email in response to your request to reset your password on <a href='http://localhost:3000/login'> Ethioian Refugee Sit</a><br/><br/>" +
          'To verify your account, please follow the link below: <a href="' +
          forgotPasswordLink +
          '">verify</a><br/><br/>' +
          "We recommend that you keep your password secure and not share it with anyone.If you didn't request to this message, simply ignore this message.<br/><br/>" +
          "Ethiopian Refugee Customer Service </span> </td> </tr> </table> </td> </tr> </table> </body></html>",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.json({
            ErrorMessage: error,
          });
        } else {
          console.log("succcesssss");
          User.updateOne({ "email": email }, { $set: { verified: true } }, (err, doc) => {
            if (err) return console.log(err);
            // return res.json({ doc });
          console.log("verifyed successfully");
          })
          return res.json({
            SuccessMessage: "email successfully sent!",

          });
        }
      });
    } else {
      return res.json({
        ErrorMessage: "Email can't be none!",
      });
    }
    // upto here verifcation
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);

  }
}
//   );


//   app.patch("/update", async (req, res) => {


//   });



exports.verified = (req, res) => {
  const { email } = req.body;
  console.log("verifying");
  User.updateOne({ "email": email }, { $set: { verified: true } }, (err, doc) => {
    if (err) return console.log(err);
    return res.json({ doc });
  })
}

//   app.post("/CreateEdir", 

exports.CreateEdir = async (req, res) => {
  const {
    visiblty,
    NameOfeDirr,
    Location,
    eDirrType,
    Amount,
    Rqdate,
    PaymentDuration,
    PaymentDay,
    Description,
    Creator,
  } = req.body;


  console.log("eDirr created ");

  try {
    await Edirs.create({
      visiblty,
      NameOfeDirr,
      Location,
      eDirrType,
      Amount,
      Rqdate,
      PaymentDuration,
      PaymentDay,
      Description,
      Creator,
    })
    Admin.updateOne({ _id: "641b09fbc5dd296cf1c700a7" }, { $push: { Notification: [{ text: Creator + "have created " + NameOfeDirr, Creator: Creator, edirr: NameOfeDirr }] } }, (err, doc) => {
      if (err) return console.log(err);
      console.log("NOtified")






    });
    res.send({ status: "ok" });
    console.log("eDirr created successfully");


  } catch (error) {
    res.send({ status: "error" });
    console.log(error);

  }
}
//   );





// app.post("/register1", async (req, res) => {
//   const { userName,fullName,phoneNumber,email,password,cpassword } = req.body;
//   const role= "admin";
//     console.log("hello");

//     try {
//         await User.create({
//           userName,
//           fullName, 
//           phoneNumber,
//           email,
//           password,
//             role,
//         });  
//         res.send({ status: "ok" });
//         console.log("success");


//     } catch (error) {
//         res.send({status: "error" });
//         console.log("error");

//     } 
// });


//   app.get("/Getedirr", 
exports.Getedirr = (req, res) => {
  console.log("ughyugh");
  Edirs.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    else {

      console.log(data)
      res.status(200).send(data);

    }
  }).sort({createdAt: -1})

}
//   )
//   app.get("/Getuser",
exports.Getuser = async (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      console.log(data.length);
      res.status(200).send(data);


    }
  })

}
//   )

// Edirs.find({Members:[{Email:email}]}, 
// Edirs.find({Members:[{Email:email}]},{$push:{Members:[{Email:email}]}},(err,doc)=>{
//   if (err) return console.log(err);
//   User.updateOne({email:email},{$push:{Notification:[{text:"you have joined "+ edirr,edirr:edirr}]}},(err,doc)=>{
//     if (err) return console.log(err);
//     console.log("NOtified")
//   });
//   res.json(doc)

// });


// ({Members:{$elemMatch: {"Email":email}}}
//   app.post("/Getedirrho", 
// exports.Getedirrho = async (req, res) => {
//   const { email } = req.body;
//   console.log(email);
//   Edirs.find({ Members: { $elemMatch: { "Email": email } } }, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     else {
//       res.status(200).send(data);


//     }
//   })

// }
exports.Getedirrname = async (req, res) => {
  const { edirrName } = req.body;
  console.log(edirrName);
  // find({ email: email },
  Edirs.find( { "NameOfeDirr": edirrName } , (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      // console.log(data);
      res.status(200).send(data);


    }
  })

}
// app.get("/api/forgot-password", 
exports.forgotPassword = async (req, res) => {
  var email = req.query.email;
  const user = await User.findOne({ email });
  if (!user) {
    console.log("User Not found");
    return res.json({ error: "User Not found" });
  }

  console.log("forget password");
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "refugee823@gmail.com",
      pass: "kulwwmpybuhcvfeq",
    },
  });
  console.log("hello", req.query.email);
  if (req.query.email) {
    console.log(req.query.email);
    const forgotPasswordToken = jwt.sign({},
      { userEmail: req.query.email },
      "Wintu-Yoni@2022",
      {
        expiresIn: "4h",
      }
    );

    var forgotPasswordLink =
      "http://localhost:3000/reset-password/?token=" + forgotPasswordToken;
    var mailOptions = {
      from: "valwintina@gmail.com",
      to: req.query.email,
      subject: "Reset Password",
      html:
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
        '<html xmlns="http://www.w3.org/1999/xhtml"><head>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
        "<title>Forgot Password</title>" +
        "<style> body {background-color: #FFFFFF; padding: 0; margin: 0;}</style></head>" +
        '<body style="background-color: #FFFFFF; padding: 0; margin: 0;">' +
        '<table border="0" cellpadding="0" cellspacing="10" height="100%" bgcolor="#FFFFFF" width="100%" style="max-width: 650px;" id="bodyTable">' +
        '<tr><td align="center" valign="top">' +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailContainer" style="font-family:Arial; color: #333333;">' +
        '<tr><td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding-  bottom: 10px;">' +
        "</td></tr><tr>" +
        '<td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding: 20px 0 10px 0;">' +
        '<span style="font-size: 18px; font-weight: normal;">FORGOT PASSWORD</span></td></tr><tr>' +
        '<td align="left" valign="top" colspan="2" style="padding-top: 10px;">' +
        '<span style="font-size: 12px; line-height: 1.5; color: #333333;">' +
        " We have sent you this email in response to your request to reset your password on <a href='http://localhost:3000'> Ethioian Refugee Sit</a><br/><br/>" +
        'To reset your password for, please follow the link below: <a href="' +
        forgotPasswordLink +
        '">Reset Password</a><br/><br/>' +
        "We recommend that you keep your password secure and not share it with anyone.If you didn't request to this message, simply ignore this message.<br/><br/>" +
        "Ethiopian Refugee Customer Service </span> </td> </tr> </table> </td> </tr> </table> </body></html>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({
          ErrorMessage: error,
        });
      } else {
        console.log("succcesssss");
        return res.json({
          SuccessMessage: "email successfully sent!",
        });
      }
    });
  } else {
    return res.json({
      ErrorMessage: "Email can't be none!",
    });
  }
};


exports.LeaveEdirr = async (req, res) => {
  const { id, email } = req.body;
  console.log(id);
  console.log(email);
  Edirs.updateOne({ _id: id }, { $pull: { Members: { Email: email } } }, (err, doc) => {
    // if (err) return console.log(err);
    if (err) {
      res.status(500).send(err);
    }
    else {

      res.status(200).send(doc);


    }
  })

}

exports.ResetPassword = async (req, res) => {
  const { newPassword, email } = req.body;
  console.log(newPassword, email);
  // Edirs.updateOne({ "NameOfeDirr": edirrName }, { $set: { "Members.$[].Payment": "Payed" } }, (err, doc) => {
  const encreptedPassword = await bcrypt.hash(newPassword, 10);
  User.updateOne({ "email": email }, { $set: { password: encreptedPassword } }, (err, doc) => {
    if (err) return console.log(err);
    return res.json({ doc });
  })
  // $elemMatch: { "Creator": email }
}


exports.Report = async (req, res) => {
  console.log("reporting");
  const { edirrName, id, UserName, Report } = req.body;
  const now = new Date();
  const aa = String(now);
  var bb = aa.split(" ", 4);
  const today = bb.join();
  console.log(edirrName, id, UserName, Report, today);
  // console.log(email);
  Admin.updateOne({ $push: { Report: { EdirName: edirrName, EdirrId: id, UserName: UserName, Report: Report, Date: today, } } }, (err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    else {

      res.status(200).send(doc);


    }
    // Admin.updateOne({ _id: "641b09fbc5dd296cf1c700a7" }, { $push: { Notification: [{   text: Creator+"have created " + NameOfeDirr, Creator:Creator,edirr: NameOfeDirr }] } }, (err, doc) => {
    //   if (err) return console.log(err);
    //   console.log("NOtified")






    // });
    // if (err) return console.log(err);

  })
}

exports.Contact = async (req, res) => {
  console.log("reporting");
  const { Email, subject, message } = req.body;
  const now = new Date();
  const aa = String(now);
  var bb = aa.split(" ", 4);
  const today = bb.join();
  console.log(Email, subject, message, today);
  // console.log(email);
  Admin.updateOne({ $push: { Contact: { Email: Email, Subject: subject, Message: message, Date: today, } } }, (err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    else {

      res.status(200).send(doc);


    }
    // Admin.updateOne({ _id: "641b09fbc5dd296cf1c700a7" }, { $push: { Notification: [{   text: Creator+"have created " + NameOfeDirr, Creator:Creator,edirr: NameOfeDirr }] } }, (err, doc) => {
    //   if (err) return console.log(err);
    //   console.log("NOtified")






    // });
    // if (err) return console.log(err);

  })
}


//   )







//   app.post("/Getnot", 
exports.Getnot = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  User.find({ email: email }, 'Notification',

    (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).send(data);


      }
    })

}
//   )

//   app.get("/GetAdminnot", 
exports.GetAdminnot = async (req, res) => {
  // const { email } = req.body;
  // console.log(email);
  Admin.find({ _id: "641b09fbc5dd296cf1c700a7" }, 'Notification',

    (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        console.log(data);
        res.status(200).send(data);


      }
    })

}
//   )

//   app.post("/GetReqnot",
exports.GetReqnot = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const u = Edirs.find({ $elemMatch: { "Creator": email } })
  Edirs.find({ Creator: email },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).send(data);


      }
    }

  )
  // const users = await Edirs.findOne({"Creator":email});
  // console.log(u);
  // Edirs.find({Creator:email}, 'Request',

  //   (err,data)=>{
  //   if(err){
  //     res.status(500).send(err);
  //   }
  //   else{
  //     res.status(200).send(data);


  //   }
  // })

}
//   )




//   app.post("/Getmemb", 
exports.Getmemb = async (req, res) => {
  const { email, edirrName } = req.body;
  console.log(edirrName);
  Edirs.findOne({ NameOfeDirr: edirrName }, 'Members',

    (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).send(data);


      }
    })

}
//   )








//   app.post("/Getedirr", 
exports.Getedirrs = async (req, res) => {
  const eDirr = await Edirs.findOne({});
  var NameOfeDirr = eDirr.NameOfeDirr;
  var Location = eDirr.Location;
  var eDirrType = eDirr.eDirrType;
  var Amount = eDirr.Amount;
  var Rqdate = eDirr.Rqdate;
  var PaymentDuration = eDirr.PaymentDuration;
  var PaymentDay = eDirr.PaymentDay;
  var Description = eDirr.Description;
  var Creator = eDirr.Creator;
  return res.json({
    status: "ok", NameOfeDirr,
    Location,
    eDirrType,
    Amount,
    Rqdate,
    PaymentDuration,
    PaymentDay,
    Description,
    Creator,
  });

}
//   );

//   app.post("/profile", 
exports.profile = async (req, res) => {

  
  const { email } = req.body;
  
  // const info = await User.findOne({ email });
  

  try {
    const info = await User.findOne({ email });
    if (info) {
      res.json({ status: "ok", info });
      console.log(info);
    } else {
      res.json({ status: "error", message: "Email not found" });
    }
  } catch (err) {
    res.send({ error: err.message });
    console.log(err.message);
  }
}
//   );


//   app.post("/payment", 
exports.payment = async (req, res) => {
  const { email, Amount, edirrName } = req.body;
  console.log(Amount + email+edirrName);
  const ch = new chapa.Chapa(
    {
      secretKey: "CHASECK_TEST-SLHPTDx9tbv7BkdaNmx45Lu4yLkcvLcF"
    }
  )

  const tx_ref = await ch.generateTransactionReference({
    prefix: 'Edir',
    size: 20
  });
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'https://api.chapa.co/v1/transaction/initialize',
    'headers': {
      'Authorization': 'Bearer CHASECK_TEST-SLHPTDx9tbv7BkdaNmx45Lu4yLkcvLcF',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "amount": Amount,
      "currency": "ETB",
      "email": email,
      "first_name": "Yonatan",
      "last_name": "Mekonnen",
      "phone_number": "0912345678",
      "tx_ref": tx_ref,
      "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      "return_url": "http://localhost:3000/my-edirr",
      "customization[title]": "Payment for my favourite merchant",
      "customization[description]": "You have paid your inital payment "
    })

  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    Edirs.updateOne({ "NameOfeDirr": edirrName }, { $set: { "Members.$[].Payment": "Payed" } }, (err, doc) => {

      console.log("chapa said" + response.body);
      const respBody = JSON.parse(response.body);

      return res.json({ url: respBody.data.checkout_url });
      // console.log(respBody.data.checkout_url);
      // res=response.body;
      // return res.json(respBody);
    })
  });
  // if (err) return console.log(err);
  //       console.log("NOtified")
  //     });
  //     res.json(doc)
  //  Edirs.updateOne({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}}
  // Edirs.updateOne({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}}
  //   const users = await Edirs.findOne({Members:{$elemMatch: {"Email":email,"Payment":"Payed"}}});

}
//   );



//   app.post("/checkmonthpayment", 
exports.checkmonthpayment = async (req, res) => {
  const { email, edirrName, toDay } = req.body;
  console.log("the name is  " + edirrName);
  // const user = await Edirs.findOne({ edirrName });
  console.log(toDay);
  // const cursor = db.collection('inventory').find({
  //   instock: { $elemMatch: { qty: 5, warehouse: 'A' } }
  // });

  // const u = JSON.parse(user.Members);
  // console.log(u);
  const users = await Edirs.findOne({ "NameOfeDirr": edirrName, "MonthlyPayment.Email": email, "MonthlyPayment.Date": toDay });
  // const users = await Edirs.find({MonthlyPayment:{Email:email}});
  // console.log(users);
  var check;
  console.log(users);
  if (!users && users === null) {
    check = "Not Payed";
  } else {
    check = "Payed";
  }
  console.log(check);
  return res.json({ check });

}
//   );







//   app.post("/monthpayment", 
exports.monthpayment = async (req, res) => {
  const { email, Amount, edirrName } = req.body;
  const now = new Date();
  const aa = String(now);
  var bb = aa.split(" ", 4);
  const today = bb.join();
  console.log(Amount + email);
  const ch = new chapa.Chapa(
    {
      secretKey: "CHASECK_TEST-SLHPTDx9tbv7BkdaNmx45Lu4yLkcvLcF"
    }
  )

  const tx_ref = await ch.generateTransactionReference({
    prefix: 'Edir',
    size: 20
  });

  var options = {
    'method': 'POST',
    'url': 'https://api.chapa.co/v1/transaction/initialize',
    'headers': {
      'Authorization': 'Bearer CHASECK_TEST-SLHPTDx9tbv7BkdaNmx45Lu4yLkcvLcF',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "amount": Amount,
      "currency": "ETB",
      "email": email,
      "first_name": "Yonatan",
      "last_name": "Mekonnen",
      "phone_number": "0912345678",
      "tx_ref": tx_ref,
      "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      "return_url": "http://localhost:3000/my-edirr",
      "customization[title]": "Payment for my favourite merchant",
      "customization[description]": "You have paid your inital payment "
    })

  };
  var request = require('request');
  request(options, function (error, response) {
    if (error) throw new Error(error);
    // ({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}}
    // UserInfo.updateMany({email: email},{$set:{firstName:firstName,lastName:lastName,dateOfBirth:DOB,nation:nation,gender:gender,myFile:postImage}}
    // Edirs.updateMany({"NameOfeDirr": edirrName},{$push:{MonthlyPayment:{Email:email,Date:today,Amount:Amount}}.$[].Email":email,"MonthlyPayment.$[].Date":today,"MonthlyPayment.$[].Amount":Amount}}
    Edirs.updateMany({ "NameOfeDirr": edirrName }, { $push: { MonthlyPayment: { Email: email, Date: today, Amount: Amount } } }, (err, doc) => {
      if (err) return console.log(err);
      console.log("payed")
      console.log("chapa said" + response.body);
      const respBody = JSON.parse(response.body);

      return res.json({ url: respBody.data.checkout_url });
      // console.log(respBody.data.checkout_url);
      // res=response.body;
      // return res.json(respBody);
    })
  });
  // if (err) return console.log(err);
  //       console.log("NOtified")
  //     });
  //     res.json(doc)
  //  Edirs.updateOne({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}}
  // Edirs.updateOne({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}}
  //   const users = await Edirs.findOne({Members:{$elemMatch: {"Email":email,"Payment":"Payed"}}});

}
//   );









//   app.post("/Join", 
exports.Join = async (req, res) => {
  const { email, NameOfeDirr, Creator } = req.body;
  console.log(email, NameOfeDirr, Creator);
  Edirs.updateOne({ NameOfeDirr: NameOfeDirr }, { $push: { Member: [{ Email: email }] } }, (err, doc) => {
    if (err) return console.log(err);
    User.updateOne({ email: Creator }, { $push: { Notification: [{ text: email + " wants to join your edirr", name: email, edirr: NameOfeDirr }] } }, (err, doc) => {
      if (err) return console.log(err);
      console.log("NOtified")
    });
    res.json(doc)

  });



}
//   );

// var i;
// const PaymentDay="11"
// // Your code here
// const now = new Date();
// const aa = String(now);
// var bb = aa.split(" ", 4);
// const curentpayment = bb[2];
// console.log(curentpayment);
// const Edir= await Edirs.find({CurrentPaymentDay:curentpayment});
// // const users= await User.find();
// // console.log(users);
// // console.log(Edir[0].Members[0].Email)
// var Store = []
// Edir.forEach((eDir)=>{
//   eDir.Members.forEach((members)=>{
//     Store = Store.concat( members.Email)
//   })
// })
// // console.log(Store);

// Store.forEach(async (eDir) =>{
//   const paymentNotification =await Edirs.find({"Members.Email": eDir,"Members.Payment": "Not Payed",CurrentPaymentDay:curentpayment});
//   // console.log(paymentNotification);
//   paymentNotification.forEach((PN)=>{
//     console.log(PN.NameOfeDirr,now,PN.Amount)
//     User.updateOne({email:eDir},{$push:{Notification:[{text:"Your monthly payment is due ",edirr:PN.NameOfeDirr,type:"mPayment",Date:now,Payment:PN.Amount}]}},(err,doc)=>{
//       if (err) return console.log(err);
//       console.log("NOtified")
//     });
//   })
// })
// // User.updateOne({email:email},{$push:{Notification:[{text:"you have joined "+ edirr,edirr:edirr}]}},(err,doc)=>{
// //       if (err) return console.log(err);
// //       console.log("NOtified")
// //     });
// // var b=[];
// // for (i =0 ;i < users.length;i++){

// //   b = b.concat(users[i].Members.Email);
// //   //  console.log(b);
// // }

//   // console.log(users[);
 




//   app.post("/Accept1", 
exports.Accept1 = async (req, res) => {
  const { email, edirr, Creator } = req.body;
  console.log("acccept111");
  console.log(Creator);
   const paymentNotification =await Edirs.find({"Members.Email": email});
  
  Edirs.updateOne({ NameOfeDirr: edirr }, { $push: { Members: { Email: email, Payment: "Not Payed" } } }, (err, doc) => {
    if (err) return console.log(err);
    // User.updateOne({email:eDir},{$push:{Notification:[{text:"Your monthly payment is due ",edirr:PN.NameOfeDirr,type:"mPayment",Date:now,Payment:PN.Amount}]}},(err,doc)=>{
      //  
      paymentNotification.forEach((PN)=>{   
        console.log("payment notification",PN.NameOfeDirr,PN.Amount);
    User.updateOne({ email: email }, { $push: { Notification: [{ text: "you have joined please pay your inital payemnt to procced " , edirr:PN.NameOfeDirr,type:"iPayment",Payment:PN.Amount }] } }, (err, doc) => {
      if (err) return console.log(err);
      console.log("NOtified")
    
      User.updateOne(
        { email: Creator },
        { $pull: { Notification: { name: email } } }, (err, doc) => {
          if (err) return console.log(err);
          console.log("removed the notification")
        })
    });
  })
    res.json(doc)
  });
}
//   );

//   app.post("/RequestService", 
exports.RequestService = async (req, res) => {
  const { email, edirrName, Reason, postImage, creator } = req.body;
  console.log(email);
  Edirs.updateOne({ NameOfeDirr: edirrName }, { $push: { Request: { Email: email, Reason: Reason, Evidence: postImage, Payment: "Not Paid", Edirr: edirrName } } }, (err, doc) => {
    if (err) return console.log(err);
    User.updateOne({ email: creator }, { $push: { Notification: [{ text: email + " wants to request your edirr for " + Reason, name: email, edirr: edirrName }] } }, (err, doc) => {
      if (err) return console.log(err);
      console.log("Notified")
    });
    res.json(doc)

  });

}
//   );


//   app.post("/AcceptService", 
exports.AcceptService = async (req, res) => {
  const { Email, Reason, Amount, Edirr } = req.body;
  const ch = new chapa.Chapa(
    {
      secretKey: "CHASECK_TEST-SLHPTDx9tbv7BkdaNmx45Lu4yLkcvLcF"
    }
  )

  const tx_ref = await ch.generateTransactionReference({
    prefix: 'Edir',
    size: 20
  });

  var options = {
    'method': 'POST',
    'url': 'https://api.chapa.co/v1/transaction/initialize',
    'headers': {
      'Authorization': 'Bearer CHASECK_TEST-SLHPTDx9tbv7BkdaNmx45Lu4yLkcvLcF',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "amount": Amount,
      "currency": "ETB",
      "email": Email,
      "first_name": "Yonatan",
      "last_name": "Mekonnen",
      "phone_number": "0912345678",
      "tx_ref": tx_ref,
      "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      "return_url": "http://localhost:3000/my-edirr",
      "customization[title]": "Payment for my favourite merchant",
      "customization[description]": "You have paid your inital payment "
    })

  };
  //  Edirs.updateOne({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}},(err,doc)=>{
    var request = require('request');
  request(options, function (error, response) {
    if (error) throw new Error(error);
    Edirs.updateOne({ "NameOfeDirr": Edirr, "Request.$[].Email": Email }, { $set: { "Request.$[].Payment": "Payed" } }, (err, doc) => {
      if (err) return console.log(err);
      User.updateOne({ email: Email }, { $push: { Notification: [{ text: "you'r request have been accecpted for the reason  " + Reason }] } },
        (err, doc) => {
          if (err) return console.log(err);
          console.log("NOtified");
          // Edirs.updateOne(
          //   {email:Creator },
          //  {$pull : {Request:{name:email}}},(err,doc)=>{
          //    if (err) return console.log(err);
          //    console.log("removed the notification")



          //  })

        });
      console.log("payed")
      console.log("chapa said" + response.body);
      const respBody = JSON.parse(response.body);

      return res.json({ url: respBody.data.checkout_url });

      // console.log(respBody.data.checkout_url);
      // res=response.body;
      // return res.json(respBody);
    })
  });











  //   console.log(email);
  //   Edirs.updateOne({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}},(err,doc)=>{
  //     if (err) return console.log(err);
  // User.updateOne({email:email},{$push:{Notification:[{text:"you'r request have been accecpted from edirr "+edirr,edirr:edirr}]}},
  //     (err,doc)=>{
  //       if (err) return console.log(err);
  //       console.log("NOtified")
  //     });
  //     res.json(doc)

  //   });



}
//   );





//   app.post("/checkpayment", 
exports.checkpayment = async (req, res) => {
  const { email, edirrName } = req.body;
  console.log("the name is  " + edirrName);
  const user = await Edirs.findOne({ edirrName });



  // const u = JSON.parse(user.Members);
  // console.log(u);
  const users = await Edirs.findOne({ "NameOfeDirr": edirrName, "Members.Email": email, "Members.Payment": "Not Payed" });
  // console.log(users);
  var check;
  console.log(users);
  if (!users && users == null) {
    check = "Payed";
  } else {
    check = "Not Payed";
  }
  console.log(check);
  return res.json({ check });

}
//   );



//   app.post("/login-user", 
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log("emaillll", 0);
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ error: "User Not found" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    var check;

    if (user.verified == false) {
      check = "notVerified";
      console.log(check);
    }
    else {
      console.log("are we here");
      if (user.UserInformation.length===0){
        check = "notDone";
      }else{
      for (let i = 0; i < user.UserInformation.length; i++) {
        if (user.UserInformation[i].Emergencyaddress === null || !user.UserInformation[i].Emergencyaddress) {
          // Emergency address is null or falsy for this element
          check = "notDone";
          console.log("Emergency address is null or falsy for userinfo element at index", i);
          break; // Exit the loop after the first iteration
        }
        else {
          check = "Done";
        }
      console.log("Check:", check);

      }
    }
      console.log("Check:", check);
    }

    const role = user.role;
    const fullName = user.fullName;

    if (res.status(201)) {
      if (role == "user") {
        return res.json({ status: "ok", role: "user", email, password, fullName, check, data: token });
      }
      if (role == "admin") {
        return res.json({ status: "ok", role: "admin", data: token });
      }
    }
    else {
      return res.json({ error: "error" });
    }
  }

  res.json({ status: "error", error: "Invalid Password" });
}
//   );


// app.post("/uploads", async (req, res) => {
//   console.log("we are in upload");
//   const body = req.body;
//   try{
//       const newImage = await  Post.create(body)
//       newImage.save();
//       res.status(201).json({ msg : "New image uploaded...!"})
//   }catch(error){
//       res.status(409).json({ message : error.message })
//       console.log(error);
//   }
// })

//   app.post("/UpdateBasic", 
exports.UpdateBasic = async (req, res) => {
  const { email, firstName, lastName, DOB, nation, gender, postImage } = req.body;
  console.log(email, firstName, lastName, DOB, nation, gender);
  // console.log(postImage);
  UserInfo.updateMany({ email: email }, { $set: { firstName: firstName, lastName: lastName, dateOfBirth: DOB, nation: nation, gender: gender, myFile: postImage } }, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc)
  });

}
//   );
//   app.post("/UpdateEmergency", 
exports.UpdateEmergency = async (req, res) => {
  console.log("we in emrgency");
  const { email, emergency, relationship, EPN, EA } = req.body;
  UserInfo.updateMany({ email: email }, { $set: { emergency_contact: emergency, relationship: relationship, EmergencyPhoneNo: EPN, Emergencyaddress: EA } }, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc)
  });

}
//   );
//   app.post("/UpdateAddress", 
exports.UpdateAddress = async (req, res) => {
  console.log("we in emrgency");
  const { email, city, subCity, wereda, kebele, houseNumber, phoneNumber } = req.body;
  UserInfo.updateMany({ email: email }, { $set: { city: city, subCity: subCity, wereda: wereda, kebele: kebele, houseNumber: houseNumber, phoneNumber: phoneNumber } }, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc)
  });

}
//   );

//   app.post("/UpdateEducation", 
exports.UpdateEducation = async (req, res) => {
  console.log("we in emrgency");
  const { email, level, position, institution, place, certificate, workId, postcertificate, postexperience } = req.body;
  UserInfo.updateMany({ email: email }, { $set: { level: level, position: position, institution: institution, place: place, certificate: certificate, workId: workId, certificateres: postcertificate, experienceres: postexperience } }, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc)
  });

}
//   );
//   app.post("/UpdateMarital", 
exports.UpdateMarital = async (req, res) => {
  console.log("we in marital");
  const { email, title, partner, PPN, PA, childName, childGender, childAge } = req.body;
  UserInfo.updateMany({ email: email }, { $set: { title: title, partner: partner, parent_po_no: PPN, parent_address: PA, childName: childName, childGender: childGender, childAge: childAge } }, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc)
  });

}
//   );




//   app.post("/login-user1", 
exports.loginUser1 = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({}, JWT_SECRET);
    if (res.status(201)) {
      const role = user.role;
      if (role == "admin") {
        return res.json({ status: "ok", role: "admin", data: token });
      } if (role == "user") {
        return res.json({ status: "ok", role: "user", data: token });
      }
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
}
//   );